/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tino Butz (tbtz)

************************************************************************ */

/**
 * Base class for all box layout managers.
 */
qx.Class.define("qx.ui.mobile.layout.AbstractBox",
{
  extend : qx.ui.mobile.layout.Abstract,
  type : "abstract",


 /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param alignX {String?null} Sets the {@link #alignX} property
   * @param alignY {String?null} Sets the {@link #alignY} property
   * @param reversed {Boolean?null} Sets the {@link #reversed} property
   */
  construct : function(alignX, alignY, reversed)
  {
    this.base(arguments);
    if (alignX) {
      this.setAlignX(alignX);
    }
    if (alignY) {
      this.setAlignY(alignY);
    }
    if (reversed) {
      this.setReversed(reversed);
    }
  },




 /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Horizontal alignment of the whole children block.
     */
    alignX :
    {
      check : [ "left", "center", "right" ],
      nullable : true,
      init : null,
      apply : "_applyLayoutChange"
    },


    /**
     * Vertical alignment of each child.
     */
    alignY :
    {
      check : [ "top", "middle", "bottom" ],
      nullable : true,
      init : null,
      apply : "_applyLayoutChange"
    },


    /**
     * Children will be displayed in reverse order.
     */
    reversed :
    {
      check : "Boolean",
      nullable : true,
      init : null,
      apply : "_applyLayoutChange"
    }
  },




 /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * The property to CSS mapping.
     */
    PROPERTY_CSS_MAPPING :
    {
      "alignX":
      {
        "hbox" :
        {
          "left" : "flex-justify-start",
          "center" : "flex-justify-center",
          "right" : "flex-justify-end"
        },
        "vbox" :
        {
          "left" : "flex-align-start",
          "center" : "flex-align-center",
          "right" : "flex-align-end"
        }
      },
      "alignY" :
      {
        "hbox" :
        {
          "top" : "flex-align-start",
          "middle" : "flex-align-center",
          "bottom" : "flex-align-end"
        },
        "vbox" :
        {
          "top" : "flex-justify-start",
          "middle" : "flex-justify-center",
          "bottom" : "flex-justify-end"
        }
      },
      "reversed" :
      {
        "hbox" :
        {
          "true" : "flex-reverse",
          "false" : null
        },
        "vbox" :
        {
          "true" : "flex-reverse",
          "false" : null
        }
      }
    },


    /**
     * Supported child layout properties. Used to check if the property is allowed.
     * List all supported child layout properties here.
     */
    SUPPORTED_CHILD_LAYOUT_PROPERTIES : {
      "flex" : 1
    }
  },


 /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    _getSupportedChildLayoutProperties : function() {
      return qx.ui.mobile.layout.AbstractBox.SUPPORTED_CHILD_LAYOUT_PROPERTIES;
    },


    // overridden
    _setLayoutProperty : function(widget, property, value)
    {
      if (property == "flex") {
        var old = this._getChildLayoutPropertyValue(widget, property);
        if (old != null) {
          widget.removeCssClass("flex" + value);
        }
        widget.addCssClass("flex" + value);
      }
    },


    // overridden
    connectToWidget : function(widget)
    {
      if (this._widget) {
        this.resetAlignX();
        this.resetAlignY();
        this.resetReversed();
      }
      this.base(arguments, widget);
    },


    // overridden
    disconnectFromChildWidget : function(widget)
    {
      this.base(arguments);
      for (var i = 0; i <= 6; i++) {
        widget.removeCssClass("flex" +i);
      }
    },



    // property apply
    _applyLayoutChange : function(value, old, property)
    {
      if (this._widget)
      {
        // In this case the layout should only have one main css class.
        var layoutCss = this._getCssClasses()[0];
        var CSS_MAPPING = qx.ui.mobile.layout.AbstractBox.PROPERTY_CSS_MAPPING[property][layoutCss];
        if (old)
        {
          var oldCssClass = CSS_MAPPING[old];
          if (oldCssClass) {
            this._widget.removeCssClass(oldCssClass);
          }
        }
        if (value)
        {
          var cssClass = CSS_MAPPING[value];
          if (cssClass) {
            this._widget.addCssClass(cssClass);
          }
        }
      } else {
        // remember the state until the widget is connected
        if (value) {
          this._addCachedProperty(property, value);
        }
      }
    }
  }
});
