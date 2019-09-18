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
 * insert_block_comments helper function: Get an array with the positions of every instance of a substring within a string
 * @param $originalString
 * @param $subString
 */
function get_substring_positions($originalString, $subString) {
  $lastPos = 0;
  $positions = array();

  while (($lastPos = strpos($originalString, $subString, $lastPos)) !== false) {
    $positions[] = $lastPos;
    $lastPos += strlen($subString);
  }

  return $positions;
}

/**
 * insert_block_comments helper function: Get an array of block positions within a twig string where the blocks between embed tags are filtered out
 * @param $blockPositions
 * @param $embedStartPositions
 * @param $embedEndPositions
 */
function remove_embed_block_positions($blockPositions, $embedStartPositions, $embedEndPositions) {
  // return out of the function with a terminal message if embed start and end positions are inconsistent
  if (count($embedStartPositions) > count($embedEndPositions)) {
    echo 'An embed is missing a closing tag.';
    return false;
  } else if (count($embedStartPositions) < count($embedEndPositions)) {
    echo 'An embed is missing a start tag.';
    return false;
  }

  $filteredPositions = $blockPositions;
  // loop embed start/end tags
  for($i = 0; $i < count($embedStartPositions); $i++) {
    $filteredPositions = array_filter($filteredPositions, function($blockPosition) use ($embedStartPositions, $embedEndPositions, $i) {
      // filtering out all block positions between embed start/end positions
      return !($blockPosition > $embedStartPositions[$i] && $blockPosition < $embedEndPositions[$i]);
    });
  }

  return $filteredPositions;
}

/**
 * insert_block_comments helper function: Get a string where a substring is inserted at the position of another substring within an original string
 * @param $originalString
 * @param $stringToInsert
 * @param $positions
 */
function insert_substring_at_positions($originalString, $stringToInsert, $positions) {
  $stringWithSubStrings = $originalString;

  $positionOffset = 0;
  foreach ($positions as $value) {
    $position = $value + $positionOffset;
    $stringWithSubStrings = substr_replace($stringWithSubStrings, $stringToInsert, $position, 0);
    $positionOffset = $positionOffset + strlen($stringToInsert);
  }

  return $stringWithSubStrings;
}

/**
 * Get a twig string where a html comment is inserted into all blocks available to the consumer of the twig
 * @param $twigContent
 * @param $commentToInsert
 */
function insert_block_comments($twigContent, $commentToInsert) {
  $blockPositions = get_substring_positions($twigContent, '{% endblock %}');
  $embedStartPositions = get_substring_positions($twigContent, '{% embed');
  $embedEndPositions = get_substring_positions($twigContent, '{% endembed %}');
  $filteredPositions = remove_embed_block_positions($blockPositions, $embedStartPositions, $embedEndPositions);
  $twigContentWithComments = insert_substring_at_positions($twigContent, "<!-- " . $commentToInsert . " -->\n", $filteredPositions);

  return $twigContentWithComments;
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
      $twigContent = file_get_contents(
        getenv('AD_PATTERN_PATH') . $entry->src
      );
  
      $twigWithComments = insert_block_comments(
        $twigContent,
        'your content here'
      );

      $template = $twig->createTemplate($twigWithComments);

      $compiled = $twig->render(
        $template,
        $mergedData
      );

      file_write_contents(
        $entry->dest,
        $compiled
      );
    } catch (\Exception $e) {
      die("\nERROR in " . $entry->src . "\nMessage: " . $e->getMessage() . "\nFile: " . $e->getFile() . "\nLine: " . $e->getLine(). "\n\n");
    }
  }
} else {
  die('Cached folder not writable by PHP.');
}

