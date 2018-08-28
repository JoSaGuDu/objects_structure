//create my module
const displayerModule = {
  //module configuration
  moduleConfig: {
    container: $('#content'),
  },

  //init module
  init: function (customModuleConfig) {
    //build navigation system
    console.log(displayerModule.moduleConfig);
    console.log('ready to launch!');
    if (customModuleConfig && typeof (customModuleConfig) == 'object') {
      $.extend(displayerModule.moduleConfig, customModuleConfig);
    } else {
      console.log('Invalid configuration object');
    }

    //Create or cache recurring DOM elements
    displayerModule.$container = displayerModule.moduleConfig.container;
    displayerModule.$sections = displayerModule.$container
                                  .find('ul.sections > li');
    displayerModule.$section_nav = $('<p/>')
                                      .attr('id', 'section_nav')
                                      .prependTo(displayerModule.$container);
    displayerModule.$item_nav = $('<p/>')
                                  .attr('id', 'item_nav')
                                  .insertAfter(displayerModule.$section_nav);
    displayerModule.$content = $('<p/>')
                                .attr('id', 'content')
                                .insertAfter(displayerModule.$item_nav);

    // build the section-level nav and...
    displayerModule.enableNavSystem(displayerModule.$sections);

    // ..."click" the first item
    displayerModule.$section_nav.find('li:first').click();

    // hide the plain HTML from sight
    displayerModule.$container.find('ul.sections').hide();

    // make a note that the initialization is complete
    displayerModule.initialized = true;
    console.log(displayerModule.initialized);
  },

  //navigation system builder
  enableNavSystem: function ($sections) {
    $sections.each(function () {

      //get the section
      let $section = $(this);
      console.log($section);
      $('<li/>')
        .text($section.find('h2:first').text())

        // add the list item to the section navigation
        .appendTo(displayerModule.$section_nav)

        // use data() to store a reference
        // to the original section on the
        // newly-created list item
        .data('section', $section)

        // bind the click behavior
        // to the newly created list itme
        // so it will show the section
        .click(displayerModule.showSection);
    });
  },

  //build in section (item) navigation system
  enableInSectionNavSystem: function ($items) {
    $items.each(function () {

      //get the section
      let $item = $(this);

      $('<li/>')
        .text($item.find('h3:first').text())

        // add the list item to the item navigation
        .appendTo(displayerModule.$item_nav)

        // use data() to store a reference
        // to the original item on the
        // newly-created list item
        .data('item', $item)

        // bind the click behavior
        // to the newly created list item
        // so it will show the section
        .click(displayerModule.showContent);
    });

    //show selected content
  },

  //show selected section
  showSection: function () {
    //get the clicked li
    const $li = $(this);
    console.log($li);

    // clear out the left nav and content area
    displayerModule.$item_nav.empty();
    displayerModule.$content.empty();

    // get the jQuery section object from the orginal HTML,
    // which we stored using data() during buildSectionNav
    let $section = $li.data('section');
    console.log($section);

    // mark the clicked list item as current
    // and remove the current marker from its siblings
    $li.addClass('current')
      .siblings().removeClass('current');

    // find all of the items related to the section
    let $items = $section.find('ul li');
    console.log($items);

    // build the item nav for the section
    displayerModule.enableInSectionNavSystem($items);

    // "click" on the first list item in the section's item nav
    displayerModule.$item_nav.find('li:first').click();
  },

  //show selected content
  showContent: function () {
    //get the clicked li
    const $li = $(this);
    console.log($li);

    // mark the clicked list item as current
    // and remove the current marker from its siblings
    $li.addClass('current')
      .siblings().removeClass('current');

    let $content = $li.data('item');
    console.log($content);

    displayerModule.$content.html($content.html());
  }

};

$(document).ready(displayerModule.init({}));
