import React from 'react';
import Warrior from 'warrior';
import { IMAGE_PATH } from 'constants/appConstants';

import 'dmc/css/components/warriorDetail.min.css';

export default React.createClass({

  displayName: 'WarriorDetail',

  propTypes: {
  	warrior: React.PropTypes.object
  },

  render() {

    let warrior = (this.props.warrior) ? 
      <figure className="warrior-detail">
          <Warrior image={this.props.warrior.image} size="large" />
          <figcaption className="warrior-detail__caption">
              <div className="warrior-detail__name">{this.props.warrior.name}</div>
              <div className="warrior-detail__wins">{this.props.warrior.wins}</div>
          </figcaption>
      </figure> : null;

    return warrior;

  }
  
});

