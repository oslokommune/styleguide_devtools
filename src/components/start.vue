<template>
  <div class="start content">
    <h1>Oslo Styleguide</h1>

    <p>
      Oslo Styleguide is way of viewing all of Oslo kommunes shared digital components, together with documentation for
      designers and developers.
      It is built on <a href="http://atomicdesign.bradfrost.com/">Atomic Design</a> principles, and therefore
      split into atoms, molecules and organisms, which make up "patterns" that can be "consumed" by developers when
      working with projects within or related to Oslo kommune.
    </p>
    <p>The style guide is expected to have continual releases with new patterns, code improvements and bugfixes, and
      will follow <a href="http://semver.org">the semver standard</a>.</p>

    <h2>Designers</h2>
    <p>
      Designers will use the style guide for seeing which designs have been realized as "living" patterns, as well as
      reading designers documentation of it's use.
    </p>
    <p>
      It is also useful for establishing a common language among designers and developers.
    </p>
    <h2>Developers</h2>
    <p>
      The main thing, and in many cases the only thing, that Oslo Styleguide provides for direct consumption is style
      code - css/sass.
    </p>
    <p>
      To get started one would hook up a project to the style code, navigate to a pattern in Oslo Styleguide one would
      like to implement,
      and make sure that the component, on the consumers/projects side,
      has the same html output that is shown in the html tab in the patterns view in Oslo Styleguide.
    </p>
    <p>There are two main ways one could want to consume the style code from Oslo Styleguide, which we will call direct
      and indirect consumption.</p>

    <h3>Direct consumption</h3>
    <p>
      Direct consumption would mean that you hook only the sass files from the patterns that you need directly into your
      build chain.
    </p>
    <p>
      If you are using webpack you can import the desired patterns sass files (from the Oslo Styleguide node module)
      into your main sass/scss file, together with your project-specific styles, and let webpack's sass-loader compile it all into one css file.
    </p>
    <strong>Pros:</strong>
    <ul>
      <li>No more code than needed in production</li>
      <li>Easy to upgrade to newer versions, as the style guide makes new releases</li>
      <li>Access to variables and mixins from the style guide to be used in project-specific style code</li>
    </ul>
    <strong>Cons:</strong>
    <ul>
      <li>More complex to set up</li>
    </ul>

    <h3>Indirect consumption</h3>
    Indirect consumption would mean that you consume the precompiled css (either from a cdn or a local copy), containing
    all components styles, in the head of your html.
    <strong>Pros:</strong>
    <ul>
      <li>Less complex to set up</li>
    </ul>
    <strong>Cons:</strong>
    <ul>
      <li>More style code than needed in production</li>
      <li>Harder to keep up with new versions</li>
    </ul>

    <h2>Versioning</h2>
    <p>
      The development of the system follows the standards for <a href="http://semver.org">semantic versioning</a>,
      where one can expect that a version increase of type minor or patch will be backwards compatible, while one
      of type major might need changes of existing implementation to be compatible.
    </p>
    <p>
      In the case of this project that means that a minor or patch release will not contain changes to markup.
      These releases should only contain changes to resource files (that is backward compatible with existing
      major version) and additions to markup, like new patterns. A major release can be expected to change
      existing markup, that needs to be implemented if one wants to migrate from an implementation of another
      major version (eg. from 1.11.0 to 2.0.0).
    </p>

    <h2>Developer specifics</h2>
    See the ok-atomic-frontend repos docs for reading specifics on how to consume and how to contribute to the
    development of patterns.
  </div>
</template>

<script>
  export default {
    name: 'start'
  }
</script>
