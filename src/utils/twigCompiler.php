<?php
const PROJECT_DIR = __DIR__ . '/../../';
require_once PROJECT_DIR . 'vendor/autoload.php';

const variantSeparator = '-';

/**
 * Read and set .env
 */
$dotenv = new Dotenv\Dotenv(PROJECT_DIR);
$dotenv->load();

/**
 * Create a Twig environment
 */
$loader = new Twig_Loader_Filesystem(getenv('AD_PATTERN_PATH'));
$twig = new Twig_Environment($loader, [
  'strict_variables' => true
]);

/**
 * Write file to directory with contents, create directories if they don't exist
 * @param $dir
 * @param $contents
 */
function file_write_contents($dir, $contents){
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
        getenv('AD_PATTERN_PATH') . $entry->data
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
          getenv('AD_PATTERN_PATH') . $originalDataFile
        ),
        true
      );

      $mergedData = array_replace_recursive(
        $originalData,
        $variantData
      );
    } else {
      $mergedData = $variantData;
    }

    try {
      $compiled = $twig->render(
        $entry->src,
        $mergedData
      );

      file_write_contents(
        $entry->dest,
        $compiled
      );
    } catch (\Exception $e) {
      // \033[31m make the color of the output red
      die("\n\033[31mRendering: " . $entry->src . "\n\033[31mMessage: " . $e->getMessage() . "\n\033[31mFile: " . $e->getFile() . "\n\033[31mLine: " . $e->getLine(). "\n\n");
    }
  }
} else {
  die('Cached folder not writable by PHP.');
}

