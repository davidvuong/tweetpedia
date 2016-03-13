import React, { Component } from 'react';
import { Affix } from 'react-overlays';

if (process.env.BROWSER) { require('./WikiSidePanel.scss'); }

class WikiSidePanel extends Component {
  render() {
    return (
      <div className="wiki-side-panel">
        <Affix viewportOffsetTop={15} container={this}>
          <div className="panel panel-default">
            <div className="panel-body">
              <i>Search Wikipedia</i>
            </div>
          </div>
        </Affix>
      </div>
    );
  }
}
export default WikiSidePanel;
