import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Affix } from 'react-overlays';
import {
  FETCH_INIT,
  FETCH_ERROR,
  FETCH_SUCCESS
} from '../../constants/FetchStatuses';
import WikiActionCreators from '../../actions/WikiActionCreators';
import WikiArticle from './WikiArticle/WikiArticle';

if (process.env.BROWSER) { require('./WikiSidePanel.scss'); }

class WikiSidePanel extends Component {
  constructor(props) {
    super(props);

    this.getPanelForm = this.getPanelForm.bind(this);
    this.getPanelBody = this.getPanelBody.bind(this);
    this.getArticleContent = this.getArticleContent.bind(this);
    this.toggleEnlarge = this.toggleEnlarge.bind(this);
  }

  getPanelForm() {
    return this.props.isEnlarged ? 'form-lg' : 'form-sm';
  }

  getArticleContent() {
    if (!this.props.isEnlarged) {
      return <i onClick={this.toggleEnlarge}>Click me to see results</i>;
    }
    return <WikiArticle article={this.props.activeArticle} />;
  }

  getPanelBody() {
    switch (this.props.fetchStatus) {
      case FETCH_INIT:
        return <i>Searching Wikipedia...</i>;
      case FETCH_SUCCESS:
        return this.getArticleContent();
      case FETCH_ERROR:
        return <i>No results found</i>;
      default:
        return null;
    }
  }

  getDisplayState() {
    return this.props.query ? 'active' : 'hidden';
  }

  toggleEnlarge() {
    this.props.toggleEnlarge(!this.props.isEnlarged);
  }

  render() {
    let panelClassName = 'panel panel-default';
    panelClassName += ` ${this.getPanelForm()} ${this.getDisplayState()}`;

    return (
      <div className="wiki-side-panel">
        <Affix viewportOffsetTop={15} container={this}>
          <div className={panelClassName}>
            <div className="panel-body">
              {this.props.isEnlarged ?
                <button className="close" onClick={this.toggleEnlarge}>×</button> : null}
              {this.getPanelBody()}
            </div>
          </div>
        </Affix>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    history: store.wiki.history,
    activeArticle: store.wiki.activeArticle,
    query: store.wiki.query,
    fetchStatus: store.wiki.fetchStatus,
    isEnlarged: store.wiki.isEnlarged
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleEnlarge: (isEnlarged) => {
      dispatch(WikiActionCreators.togglePanel(isEnlarged));
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(WikiSidePanel);
