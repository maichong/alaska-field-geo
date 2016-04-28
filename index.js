/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-28
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');

class GeoField extends alaska.Field {
  init() {
    let field = this;
    field.index = field.index || '2dsphere';
    field.coordinate = field.coordinate || 'wgs84'; // wgs84 gcj02 bd09

    const errorMsg = `Cannot cast data to geo type, at ${field._model.name}.${field.path}`;

    this.set = function (value) {
      if (!value) {
        return;
      }
      if (Array.isArray(value)) {
        if (value.length !== 2) {
          throw new Error(errorMsg);
        }
        return value;
      }
      if (typeof value === 'object') {
        let lng = value.lng;
        let lat = value.lat;
        if (lng === undefined) {
          throw new Error(errorMsg);
        }
        return [lng || 0, lat || 0];
      }
      throw new Error(errorMsg);
    };
  }

  createFilter(filter) {
  }
}

GeoField.views = {
  cell: {
    name: 'GeoFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'GeoFieldView',
    field: __dirname + '/lib/view.js'
  }
};

GeoField.plain = Array;

GeoField.options = [];

GeoField.viewOptions = [];

module.exports = GeoField;
