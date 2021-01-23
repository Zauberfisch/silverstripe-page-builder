# SilverStripe PageBuilder module

SilverStripe module to allow for modular, block based, content in SilverStripe

## Maintainer Contact

* Zauberfisch <code@zauberfisch.at>

## Requirements

* silverstripe/framework >=3.7
* zauberfisch/silverstripe-serialized-dataobject >=3.0
* zauberfisch/silverstripe-namespace-templates >=1.0

## Installation

* `composer require "zauberfisch/silverstripe-page-builder"`
* Optional: install suggested packages
  * composer require `"zauberfisch/silverstripe-page-builder-basic-blocks"`
* rebuild manifest (flush)
* Unfortunately a bug in SilverStripe current breaks the HTMLEditorField file management 
  inside a sub controller within the CMS, to work around this bug the following work around is required: 

  In your project `.htaccess` replace `RewriteRule .* framework/main.php?url=%1 [QSA]` with 
  `RewriteRule .* index.php?url=%1 [QSA]` and create an `index.php` file (you can replace the default 
  SilverStripe file if your server supports mod_rewrite) with the following content: 
    
        <?php
        
        if (isset($_GET['ID'])) {
            # redirect as workaround for inset File dialog in the PageBuilder
            # which is broken because ?ID=<$fileID> is mistaken for a Page ID by LeftAndMain
            # lets replace ID with FileID which is then converted back in PageBuilder
            $match = true;
            $url = $_GET['url'];
            foreach(['PageBuilder', 'EditorToolbar', 'viewfile'] as $str) {
                if (strpos($url, $str) === FALSE) {
                    $match = false;
                    break;
                }
            }
            if ($match) {
                $id = $_GET['ID'];
                $_GET['url'] = str_replace(['?ID=','&ID='],['?FileID=','&FileID='], $url);
                $_REQUEST['FileID'] = $id;
                $_GET['FileID'] = $id;
                unset($_REQUEST['ID']);
                unset($_GET['ID']);
            }
        }
        
        chdir('framework');
        require 'framework/main.php';

## Documentation

Add the PageBuilder DB Field and FormField to any DataObject, for example Page:

    class Page extends SiteTree {
        private static $db = [
            'PageBuilder' => \zauberfisch\PageBuilder\Model\DBField::class,
        ];
        
        public function getCMSFields() {
            $fields = parent::getCMSFields();
            $fields->addFieldsToTab('Root.Main', [
                new \zauberfisch\PageBuilder\Form\Field('PageBuilder', $this->fieldLabel('PageBuilder')),
            ]);
            return $fields;
        }
    }
    
Now, in your template, you can access $PageBuilder and output the content:

    <% if $PageBuilder %>
        <div class="my-content-blocks">
            $PageBuilder.Value
        </div>
    <% end_if %>
    
See [docs/example.md](docs/example.md) for example project files with some basic frontend. 
    
However, in the bare installation this module does not provide any content types.
It just provides the abstract classes and form fields.    
Just like with SilverStripe DataObjects it is up to the individual developer and 
other modules to define the desired data types.    
A good starting point with some basic block types can be found in the 
[basic blocks module](https://packagist.org/packages/zauberfisch/silverstripe-page-builder-basic-blocks).

Documentation for creating custom blocks has not been written yet, please refer
to the [basic blocks module](https://packagist.org/packages/zauberfisch/silverstripe-page-builder-basic-blocks), 
they should serve as good examples.

## Known Issues

- [ ] When using this module with Translatable, the language selection for the TreeDropdownField in the 
     HTMLEditorField insert link dialog does not work
- [ ] GridFields within the dialog might not work
- [ ] Duplicating a Record will duplicate blocks, but ContentBlocks are still linked by their ID, 
   therefore two objects now share the same ContentElement
- [ ] Obsolete ContentElement DataObjects are not deleted (eg if a Text Block is created, but the page is never saved)
- [ ] The Edit Dialog is not ideal for nested content that also requires a dialog (HTMLEditor, GridField, ...)
