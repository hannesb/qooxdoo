/* ************************************************************************

   qooxdoo - the new era of web interface development
   -------------------------------------------------------------------------

   Copyright:
     (C) 2004-2006 by Schlund + Partner AG, Germany
         All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.oss.schlund.de

   Authors:
     * Sebastian Werner (wpbasti)
       <sebastian dot werner at 1und1 dot de>
     * Andreas Ecker (aecker)
       <andreas dot ecker at 1und1 dot de>

************************************************************************ */

/* ************************************************************************

#package(core)

************************************************************************ */

function QxSet()
{
  qx.core.Object.call(this);

  this.clear();
};

QxSet.extend(qx.core.Object, "QxSet");




/*
---------------------------------------------------------------------------
  USER API
---------------------------------------------------------------------------
*/

proto.add = function(o) {
  this._storage[qx.core.Object.toHashCode(o)] = o;
};

proto.remove = function(o) {
  delete this._storage[qx.core.Object.toHashCode(o)];
};

proto.contains = function(o) {
  return qx.core.Object.toHashCode(o) in this._storage;
};

proto.clear = function() {
  this._storage = {};
};

proto.toArray = function()
{
  var res = [];

  for (var hc in this._storage) {
    res.push(this._storage[hc]);
  };

  return res;
};





/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/

proto.dispose = function()
{
  if (this.getDisposed()) {
    return;
  };

  this._storage = null;

  return qx.core.Object.prototype.dispose.call(this);
};
