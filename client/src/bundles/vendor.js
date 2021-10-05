/* eslint-disable
 import/no-webpack-loader-syntax,
 import/no-extraneous-dependencies,
 import/no-unresolved
*/

// Expose the libraries as globals for other modules to access
// Note that these are order-dependent - earlier items should not depend on later ones
require("expose-loader?CraftJsCore!@craftjs/core")
require("expose-loader?CraftJsUtils!@craftjs/utils")
