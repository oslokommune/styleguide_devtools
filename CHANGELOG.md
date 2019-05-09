# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased] - YYYY-MM-DD

### Fixed

- Zero viewbox padding when solid background is used in the gui settings

### Added

- Support for switching on and off devtools gui features
- Transpiling changelog to html for viewing in the devtools gui

### Removed

### Changed

## [0.8.1] - 2019-05-01

### Fixed

- iframe autosizing
- switch from alt-watch to watch
- only compiling the files of the same type as the one that changed in watch script
- added compilation outputs in watch
- colored outputs for change detection and twig/sass errors
- added -kill flag to watch script to cancel running builds on new change
- formatting compiled html before outputting to gui
- duplicate includes bug
- iframe autosizing bug

### Added

- support for listing embedded twig files
