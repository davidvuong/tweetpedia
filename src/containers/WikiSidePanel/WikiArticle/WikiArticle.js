import React, { Component, PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import { WIKI_URL } from '../../../constants/Constants';

if (process.env.BROWSER) { require('./WikiArticle.scss'); }

const propTypes = {
  article: PropTypes.object.isRequired
};

class WikiArticle extends Component {
  constructor(props) {
    super(props);

    this.getCategories = this.getCategories.bind(this);
    this.truncate = this.truncate.bind(this);
  }

  getCategories() {
    const article = this.props.article;
    if (!article || !article.categories) { return null; }

    return (
      <div className="article-categories">
        {/* Just display the first 10 categories to avoid overflow. */}
        {article.categories.slice(0, 10).map((category, i) => {
          return <Label bsStyle="info" key={i}>{category}</Label>;
        })}
      </div>
    );
  }

  truncate(text, limit) {
    return (text.length > limit) ? `${text.substr(0, limit - 1)}...` : text;
  }

  render() {
    const article = this.props.article;
    return (
      <div className="wiki-article">
        <h1>{article.title}</h1>
        <small>{this.truncate(article.text, 50)}</small>
        <hr />
        <p>{this.truncate(article.text, 300) || 'No description available...'}</p>
        {this.getCategories()}
        <hr />
        <a href={`${WIKI_URL}/${article.title}`} target="_blank">
          See full article
        </a>

        <p className="powered-by">
          Powered by&nbsp;
          <a href="https://github.com/spencermountain/wtf_wikipedia" target="_blank">
            wtf_wikipedia
          </a>
        </p>
      </div>
    );
  }
}
WikiArticle.propTypes = propTypes;

export default WikiArticle;
