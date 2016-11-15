# PageBuilder project example

composer.json

    {
        "require": {
            "php": ">=5.4",
            "silverstripe/cms": "^3.5",
            "silverstripe/framework": "^3.5",
            "zauberfisch/silverstripe-page-builder": "^1.0",
            "zauberfisch/silverstripe-page-builder-basic-blocks": "^1.0"
        },
        "minimum-stability": "dev",
        "prefer-stable": true
    }

mysite/code/Page.php

    <?php
    
    class Page extends SiteTree {
        private static $db = [
            'PageBuilder' => 'PageBuilder_DBField',
        ];
        
        public function getCMSFields() {
            $fields = parent::getCMSFields();
            $fields->addFieldsToTab('Root.Main', [
                new PageBuilder_Field('PageBuilder', $this->fieldLabel('PageBuilder')),
            ]);
            return $fields;
        }
    }
    
    class Page_Controller extends Controller {}
    
mysite/templates/Layout/Page.ss

    <div class="content typography">
        <h2>$Title</h2>
        $Content
        $Form
    </div>
    <% if $PageBuilder %>
        <div class="my-content-blocks">
            $PageBuilder.Value
        </div>
    <% end_if %>

mysite/scss/grid.scss (optional, alternatively just use plain css below)

    // mixin to generate the css for each possible nesting of blocks
    @mixin grid-element($type: desktop) {
        @for $i from 1 through 12 {
            @for $j from $i through 12 {
                .grid-column.grid-column-#{$type}-#{$i}.grid-column-#{$type}-context-#{$j} {
                    width: 100% * $i / $j;
                }
            }
        }
    }
    
    .grid-base {
        .grid-column {
            // on mobile display all columns full width
            padding: 10px;
            margin: 0 0 10px;
            
            // add some border colors to make the grid visible
            border: 1px solid red;
            
            .grid-column {
                border-color: blue;
                
                .grid-column {
                    border-color: green;
                    
                    .grid-column {
                        border-color: yellow;
                    }
                }
            }
        }
        
        @include breakpoint(500px) {
            // on tablets use the tablet column widths from the PageBuilder
            @include grid-element(tablet);
            
            .grid-tablet-clear {
                clear: both;
            }
            .grid-column {
                float: left;
            }
        }
        @include breakpoint(700px) {
            // on desktop use the desktop column widths from the PageBuilder
            .grid-tablet-clear {
                clear: none;
            }
            .grid-desktop-clear {
                clear: both;
            }
            @include grid-element(desktop);
        }
    }

mysite/css/grid.css (generated from grid.scss)

    .grid-base .grid-column {
      /** on mobile display all columns full width **/
      padding: 10px;
      margin: 0 0 10px;
      border: 1px solid red; }
      /** add some border colors to make the grid visible **/
      .grid-base .grid-column .grid-column {
        border-color: blue; }
        .grid-base .grid-column .grid-column .grid-column {
          border-color: green; }
          .grid-base .grid-column .grid-column .grid-column .grid-column {
            border-color: yellow; }
    
    @media (min-width: 500px) {
      /** on tablets use the tablet column widths from the PageBuilder **/
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-1 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-2 {
        width: 50%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-3 {
        width: 33.33333%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-4 {
        width: 25%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-5 {
        width: 20%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-6 {
        width: 16.66667%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-7 {
        width: 14.28571%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-8 {
        width: 12.5%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-9 {
        width: 11.11111%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-10 {
        width: 10%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-11 {
        width: 9.09091%; }
      .grid-base .grid-column.grid-column-tablet-1.grid-column-tablet-context-12 {
        width: 8.33333%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-2 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-3 {
        width: 66.66667%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-4 {
        width: 50%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-5 {
        width: 40%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-6 {
        width: 33.33333%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-7 {
        width: 28.57143%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-8 {
        width: 25%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-9 {
        width: 22.22222%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-10 {
        width: 20%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-11 {
        width: 18.18182%; }
      .grid-base .grid-column.grid-column-tablet-2.grid-column-tablet-context-12 {
        width: 16.66667%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-3 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-4 {
        width: 75%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-5 {
        width: 60%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-6 {
        width: 50%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-7 {
        width: 42.85714%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-8 {
        width: 37.5%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-9 {
        width: 33.33333%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-10 {
        width: 30%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-11 {
        width: 27.27273%; }
      .grid-base .grid-column.grid-column-tablet-3.grid-column-tablet-context-12 {
        width: 25%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-4 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-5 {
        width: 80%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-6 {
        width: 66.66667%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-7 {
        width: 57.14286%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-8 {
        width: 50%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-9 {
        width: 44.44444%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-10 {
        width: 40%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-11 {
        width: 36.36364%; }
      .grid-base .grid-column.grid-column-tablet-4.grid-column-tablet-context-12 {
        width: 33.33333%; }
      .grid-base .grid-column.grid-column-tablet-5.grid-column-tablet-context-5 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-5.grid-column-tablet-context-6 {
        width: 83.33333%; }
      .grid-base .grid-column.grid-column-tablet-5.grid-column-tablet-context-7 {
        width: 71.42857%; }
      .grid-base .grid-column.grid-column-tablet-5.grid-column-tablet-context-8 {
        width: 62.5%; }
      .grid-base .grid-column.grid-column-tablet-5.grid-column-tablet-context-9 {
        width: 55.55556%; }
      .grid-base .grid-column.grid-column-tablet-5.grid-column-tablet-context-10 {
        width: 50%; }
      .grid-base .grid-column.grid-column-tablet-5.grid-column-tablet-context-11 {
        width: 45.45455%; }
      .grid-base .grid-column.grid-column-tablet-5.grid-column-tablet-context-12 {
        width: 41.66667%; }
      .grid-base .grid-column.grid-column-tablet-6.grid-column-tablet-context-6 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-6.grid-column-tablet-context-7 {
        width: 85.71429%; }
      .grid-base .grid-column.grid-column-tablet-6.grid-column-tablet-context-8 {
        width: 75%; }
      .grid-base .grid-column.grid-column-tablet-6.grid-column-tablet-context-9 {
        width: 66.66667%; }
      .grid-base .grid-column.grid-column-tablet-6.grid-column-tablet-context-10 {
        width: 60%; }
      .grid-base .grid-column.grid-column-tablet-6.grid-column-tablet-context-11 {
        width: 54.54545%; }
      .grid-base .grid-column.grid-column-tablet-6.grid-column-tablet-context-12 {
        width: 50%; }
      .grid-base .grid-column.grid-column-tablet-7.grid-column-tablet-context-7 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-7.grid-column-tablet-context-8 {
        width: 87.5%; }
      .grid-base .grid-column.grid-column-tablet-7.grid-column-tablet-context-9 {
        width: 77.77778%; }
      .grid-base .grid-column.grid-column-tablet-7.grid-column-tablet-context-10 {
        width: 70%; }
      .grid-base .grid-column.grid-column-tablet-7.grid-column-tablet-context-11 {
        width: 63.63636%; }
      .grid-base .grid-column.grid-column-tablet-7.grid-column-tablet-context-12 {
        width: 58.33333%; }
      .grid-base .grid-column.grid-column-tablet-8.grid-column-tablet-context-8 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-8.grid-column-tablet-context-9 {
        width: 88.88889%; }
      .grid-base .grid-column.grid-column-tablet-8.grid-column-tablet-context-10 {
        width: 80%; }
      .grid-base .grid-column.grid-column-tablet-8.grid-column-tablet-context-11 {
        width: 72.72727%; }
      .grid-base .grid-column.grid-column-tablet-8.grid-column-tablet-context-12 {
        width: 66.66667%; }
      .grid-base .grid-column.grid-column-tablet-9.grid-column-tablet-context-9 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-9.grid-column-tablet-context-10 {
        width: 90%; }
      .grid-base .grid-column.grid-column-tablet-9.grid-column-tablet-context-11 {
        width: 81.81818%; }
      .grid-base .grid-column.grid-column-tablet-9.grid-column-tablet-context-12 {
        width: 75%; }
      .grid-base .grid-column.grid-column-tablet-10.grid-column-tablet-context-10 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-10.grid-column-tablet-context-11 {
        width: 90.90909%; }
      .grid-base .grid-column.grid-column-tablet-10.grid-column-tablet-context-12 {
        width: 83.33333%; }
      .grid-base .grid-column.grid-column-tablet-11.grid-column-tablet-context-11 {
        width: 100%; }
      .grid-base .grid-column.grid-column-tablet-11.grid-column-tablet-context-12 {
        width: 91.66667%; }
      .grid-base .grid-column.grid-column-tablet-12.grid-column-tablet-context-12 {
        width: 100%; }
      .grid-base .grid-tablet-clear {
        clear: both; }
      .grid-base .grid-column {
        float: left; } }
    
    @media (min-width: 700px) {
      /** on desktop use the desktop column widths from the PageBuilder **/
      .grid-base .grid-tablet-clear {
        clear: none; }
      .grid-base .grid-desktop-clear {
        clear: both; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-1 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-2 {
        width: 50%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-3 {
        width: 33.33333%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-4 {
        width: 25%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-5 {
        width: 20%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-6 {
        width: 16.66667%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-7 {
        width: 14.28571%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-8 {
        width: 12.5%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-9 {
        width: 11.11111%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-10 {
        width: 10%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-11 {
        width: 9.09091%; }
      .grid-base .grid-column.grid-column-desktop-1.grid-column-desktop-context-12 {
        width: 8.33333%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-2 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-3 {
        width: 66.66667%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-4 {
        width: 50%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-5 {
        width: 40%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-6 {
        width: 33.33333%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-7 {
        width: 28.57143%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-8 {
        width: 25%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-9 {
        width: 22.22222%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-10 {
        width: 20%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-11 {
        width: 18.18182%; }
      .grid-base .grid-column.grid-column-desktop-2.grid-column-desktop-context-12 {
        width: 16.66667%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-3 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-4 {
        width: 75%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-5 {
        width: 60%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-6 {
        width: 50%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-7 {
        width: 42.85714%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-8 {
        width: 37.5%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-9 {
        width: 33.33333%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-10 {
        width: 30%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-11 {
        width: 27.27273%; }
      .grid-base .grid-column.grid-column-desktop-3.grid-column-desktop-context-12 {
        width: 25%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-4 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-5 {
        width: 80%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-6 {
        width: 66.66667%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-7 {
        width: 57.14286%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-8 {
        width: 50%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-9 {
        width: 44.44444%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-10 {
        width: 40%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-11 {
        width: 36.36364%; }
      .grid-base .grid-column.grid-column-desktop-4.grid-column-desktop-context-12 {
        width: 33.33333%; }
      .grid-base .grid-column.grid-column-desktop-5.grid-column-desktop-context-5 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-5.grid-column-desktop-context-6 {
        width: 83.33333%; }
      .grid-base .grid-column.grid-column-desktop-5.grid-column-desktop-context-7 {
        width: 71.42857%; }
      .grid-base .grid-column.grid-column-desktop-5.grid-column-desktop-context-8 {
        width: 62.5%; }
      .grid-base .grid-column.grid-column-desktop-5.grid-column-desktop-context-9 {
        width: 55.55556%; }
      .grid-base .grid-column.grid-column-desktop-5.grid-column-desktop-context-10 {
        width: 50%; }
      .grid-base .grid-column.grid-column-desktop-5.grid-column-desktop-context-11 {
        width: 45.45455%; }
      .grid-base .grid-column.grid-column-desktop-5.grid-column-desktop-context-12 {
        width: 41.66667%; }
      .grid-base .grid-column.grid-column-desktop-6.grid-column-desktop-context-6 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-6.grid-column-desktop-context-7 {
        width: 85.71429%; }
      .grid-base .grid-column.grid-column-desktop-6.grid-column-desktop-context-8 {
        width: 75%; }
      .grid-base .grid-column.grid-column-desktop-6.grid-column-desktop-context-9 {
        width: 66.66667%; }
      .grid-base .grid-column.grid-column-desktop-6.grid-column-desktop-context-10 {
        width: 60%; }
      .grid-base .grid-column.grid-column-desktop-6.grid-column-desktop-context-11 {
        width: 54.54545%; }
      .grid-base .grid-column.grid-column-desktop-6.grid-column-desktop-context-12 {
        width: 50%; }
      .grid-base .grid-column.grid-column-desktop-7.grid-column-desktop-context-7 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-7.grid-column-desktop-context-8 {
        width: 87.5%; }
      .grid-base .grid-column.grid-column-desktop-7.grid-column-desktop-context-9 {
        width: 77.77778%; }
      .grid-base .grid-column.grid-column-desktop-7.grid-column-desktop-context-10 {
        width: 70%; }
      .grid-base .grid-column.grid-column-desktop-7.grid-column-desktop-context-11 {
        width: 63.63636%; }
      .grid-base .grid-column.grid-column-desktop-7.grid-column-desktop-context-12 {
        width: 58.33333%; }
      .grid-base .grid-column.grid-column-desktop-8.grid-column-desktop-context-8 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-8.grid-column-desktop-context-9 {
        width: 88.88889%; }
      .grid-base .grid-column.grid-column-desktop-8.grid-column-desktop-context-10 {
        width: 80%; }
      .grid-base .grid-column.grid-column-desktop-8.grid-column-desktop-context-11 {
        width: 72.72727%; }
      .grid-base .grid-column.grid-column-desktop-8.grid-column-desktop-context-12 {
        width: 66.66667%; }
      .grid-base .grid-column.grid-column-desktop-9.grid-column-desktop-context-9 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-9.grid-column-desktop-context-10 {
        width: 90%; }
      .grid-base .grid-column.grid-column-desktop-9.grid-column-desktop-context-11 {
        width: 81.81818%; }
      .grid-base .grid-column.grid-column-desktop-9.grid-column-desktop-context-12 {
        width: 75%; }
      .grid-base .grid-column.grid-column-desktop-10.grid-column-desktop-context-10 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-10.grid-column-desktop-context-11 {
        width: 90.90909%; }
      .grid-base .grid-column.grid-column-desktop-10.grid-column-desktop-context-12 {
        width: 83.33333%; }
      .grid-base .grid-column.grid-column-desktop-11.grid-column-desktop-context-11 {
        width: 100%; }
      .grid-base .grid-column.grid-column-desktop-11.grid-column-desktop-context-12 {
        width: 91.66667%; }
      .grid-base .grid-column.grid-column-desktop-12.grid-column-desktop-context-12 {
        width: 100%; } }
