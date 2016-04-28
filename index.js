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
      if (Array.isArray(value)) {
        return [parseFloat(value[0]) || 0, parseFloat(value[1] || 0)];
      }
      if (typeof value === 'object') {
        let lng = parseFloat(value.lng) || 0;
        let lat = parseFloat(value.lat) || 0;
        return [lng, lat];
      }
      return [0, 0];
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
