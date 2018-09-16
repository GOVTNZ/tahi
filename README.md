# Tahi - Pattern Library for NZ Government ALPHA!

## Table of Contents

  1. [Overview](#overview)
     - [Core Features](#core-features)
     - [Key Technologies](#key-technologies)
  2. [Getting started](#getting-started)
     - [NPM](#npm)
     - [Install Packages](#install-packages)
     - [Gulp CLI](#gulp-cli)
  3. [Gulp tasks](#gulp-tasks)
  4. [SCSS](#scss)
     - [Property Ordering](#property-ordering)
     - [Comments](#scss-comments)
  6. [JavaScript](#javascript)
  7. [HTML Templating](#html-templating)
  8. [Licence](#licence)
  9. [Bugtracker and new feature proposals](#bugtracker-and-new-feature-proposals)
  10. [Contributing](#contributing)
  11. [Maintainers](#maintainers)


## Overview

#### Core Features

The boilerplate combines a number of development principles and features. The core features are:

- Combined SCSS/HTML modules in the form of Blocks and components
- ITCSS approach for SCSS structure and inheritance model
- BEM for CSS class naming
- KSS CSS comments for generation of living styleguide
- Revealing Modular Pattern for creation of Javascript modules
- Use of pub-sub module to expose global Javascript events

#### Technology Dependencies

- [Node.js LTS](https://nodejs.org) (version 8 or higher)  
  The tool uses gulp to build, watch and serve assets which requires Node and NPM to be installed on the host machine.  
  This version of the boilerplate has been tested on and supports Node LTS version 8 and above.

## Getting started

After cloning the source repository and navigating to the folder, you can use these commands to install the dependencies
and build the pattern library.

#### 1. Install packages

````bash
npm install
````

#### 2. Check code style

````bash
npm run lint
````

#### 3. Build the pattern library

````bash
npm run build
````

The process compiles all the styles and scripts and builds a pattern library inside `./build` folder.  
*The content of this folder can be published as a standalone product.*


#### 4. Run a local preview server

````bash
npm run start
````

The `build` folder is used as the source when serving the files locally.


## SCSS

- SCSS is split into base styles and component specific styles. The base styles are inherited by everything and component specific styles apply only to a specific component.

- Component based SCSS modules that use BEM SCSS class naming structure

- Structure is loosely base on SMACCS modular structure. Further details on how to use this structure can be found in the comments in each file in the SCCS root import folder. It is expected that the core SCSS will not be edited frequently.

- Uses BEM conventions for class usage within components and blocks. Components and blocks can be found inside the templates folder. Each module has a corresponding SCSS file contained within the same folder. This is where the bulk of site's styling should take place.

- Vendor Includes - normalize-SCSS and html-5-boilerplate.

- Typographic modular scale - The site includes an SCSS library for building fonts using a modular scale. Details of the specific scale should be provided in the design.

- Baseline grid - All line height, heights, widths, margins, paddings should be based on a baseline grid value. The default for this is 8px.

- Calc Flex Grid - The site uses flexbox to generate a grid. This assumes support for IE10 >. if we need to support older browsers, a custom float based grid needs to be added.

- SVG Sprite - Used for all iconography and images where appropriate. The sprite is generated from all svg files found in the icons folder.


#### Property Ordering

CSS properties should be declared in a specific order. This is shown below. For detailed information on the declaration order and specific declarations see the relevant section of the `.stylelintrc.json` file in the root of the project. 

```SCSS
  .selector {
    // Positioning
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    // Display and Box model
    display: block;
    box-sizing: border-box;
    width: 100px;
    height: 100px;

    // Overflow

    // Padding

    // Border

    // Outline

    // Margin

    // Background

    // Font and Typography
    font-family: arial, helvetica, sans-serif;
    font-size: 16px;
    line-height: 1;
    color: red;
    text-decoration: none;

    // Lists

    // Visual display
    visibility: visible;
    opacity: 0.5;

    // Transform

    // Box shadow

    // Filter

    // Animation

    // Transition

    // Cursor

    // Additional
  }
```


#### SCSS Comments

Comments across the board should follow a consistent structure. There may be some exceptions to this but try as much as possible to follow the rules below.

- Inline comments. These are comments explaining declarations and describing what the code is trying to achieve, not what the code does.

```SCSS
  // You should write single line comments like this using SCSS syntax.

  /* Don't use CSS comments like this in any project specific code! */

  // Multi line comments should be written like this. With a maximum of about
  // 80 characters per line.

  // Always try to write inline comments (non headings) using sentence
  // case. So that's a capital at the beginning of the sentence and a full
  // stop at the end.

  // They should sit on their own line.

  .element {
      background: red; // Don't write comments like this!
  }
```

- Heading comments. Examples of these can be found in the boilerplate. They are used to define different sections of the stylesheet.

```SCSS
  // Headings should be written in title case as per below examples. They
  // should all be 50 characters wide.

  // ############################################
  // Heading 1
  // ############################################

  // Remember all headings should have 2 carriage returns above them to
  // clearly define the start of a new section.


  // ============================================
  // Heading 2
  // ============================================


  // --------------------------------------------
  // Heading 3
  // --------------------------------------------


  // --------------------------------------------
  // Multi Line Header Looks Like This If It Is
  // Absolutely Necessary
  // --------------------------------------------
```

- KSS comments and their use are described in the styleguide section of this document. Broadly these follow their own conventions and the commenting rules described above should start to apply AFTER any KSS comments.

## Javascript

- Custom js (non vendor) each module should be provided in individual file and initialised from init.js. The modules themselves use the revealing modular pattern, more information on this approach can be found here: https://www.youtube.com/watch?v=pOfwp6VlnlM.
  To add new modules they must be declared specifically inside the gulp task that concatenates the modules and libraries.

- Separate modules can be initialised or accessed using the pub/sub event pattern included in the template.

- Vendor includes - modernizr.js, jquery.js.

## HTML Templating

- Uses Nunjucks (node based) templating. See https://mozilla.github.io/nunjucks/ for detailed information

- All templating files can be found in 'templates' folder. These files are split into 'components' and 'blocks'. 'Components' are composite blocks of html that contain both documentation and 'blocks'. 'blocks' are the smaller chunks of html that are used to populate 'components'.

## Licence
Licensed under the Massachusetts Institute of Technology (MIT) licence.

See [LICENSE](LICENSE.md)

## Bugtracker and new feature proposals
Bugs and new feature proposals are tracked in the issues section of this repository. 

Before submitting an issue please read over existing issues to ensure yours is unique.

If you are proposing a new feature, discuss it in an issue before raising a pull request. 
This is to save you writing code and being disapointed if it's not accepted in right away 
(given this is a shared pattern library, dialogue is a good thing).
 
If the issue does look like a new bug:
 
 - Create a new issue
 - Describe the steps required to reproduce your issue, and the expected outcome. Unit tests, screenshots 
 and screencasts can help here.
 - Describe your environment e.g. OS, software versions etc.
 
Please report security issues to the module maintainers directly. Please don't file security issues in the bugtracker.

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md).md

## Maintainers
Govt.nz team <govtnz@dia.govt.nz>


