<?php
const PROJECT_DIR = __DIR__ . '/../../';
require_once PROJECT_DIR . 'vendor/autoload.php';

const variantSeparator = '-';

/**
 * Read and set .env
 */
$dotenv = Dotenv\Dotenv::createImmutable(PROJECT_DIR);
$dotenv->load();

/**
 * Create a Twig environment
 */
$loader = new \Twig\Loader\FilesystemLoader($_ENV['COMPONENTS_PATH']);
$twig = new \Twig\Environment($loader, [
  'strict_variables' => true
]);

/**
 * Write file to directory with contents, create directories if they don't exist
 * @param $dir
 * @param $contents
 */
function file_write_contents($dir, $contents)
{
  $parts = explode('/', $dir);
  $file = array_pop($parts);
  $dir = PROJECT_DIR . 'dist/' . implode('/', $parts);

  if (!is_dir($dir) && !mkdir($dir, 0777, true) && !is_dir($dir)) {
    throw new \RuntimeException(sprintf('Directory "%s" was not created', $dir));
  }
  file_put_contents("$dir/$file", $contents);
}

/**
 * Render twig files
 */
$twigData = json_decode(
  file_get_contents(
    PROJECT_DIR . 'build/twig.json'
  )
);
if (is_writable(PROJECT_DIR . 'dist')) {
  foreach ($twigData as $entry) {
    $isVariant = strpos($entry->data, variantSeparator) !== false;
    $variantData = json_decode(
      file_get_contents(
        $_ENV['COMPONENTS_PATH'] . $entry->data
      ),
      true
    );
    if ($isVariant) {
      $originalDataFile = substr(
        $entry->data,
        0,
        strpos($entry->data, variantSeparator)
      ) . '.json';

      $originalData = json_decode(
        file_get_contents(
          $_ENV['COMPONENTS_PATH'] . $originalDataFile
        ),
        true
      );

      $variantData = is_null($variantData) ? [] : $variantData;
      $mergedData = array_replace_recursive(
        $originalData,
        $variantData
      );
    } else {
      $mergedData = $variantData;
    }

    try {
      $twigContent = file_get_contents(
        $_ENV['COMPONENTS_PATH'] . $entry->src
      );

      $template = $twig->createTemplate($twigContent);

      $mergedData = is_null($mergedData) ? [] : $mergedData;
      $compiled = $twig->render(
        $template,
        $mergedData
      );

      file_write_contents(
        $entry->dest,
        $compiled
      );
    } catch (\Exception $e) {
      die("\nERROR in " . $entry->src . "\nMessage: " . $e->getMessage() . "\nFile: " . $e->getFile() . "\nLine: " . $e->getLine() . "\n\n");
    }
  }
} else {
  die('Cached folder not writable by PHP.');
}
