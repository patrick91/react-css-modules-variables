import React from 'react';

// eslint-disable-next-line
import styles from 'app';

import ArticleHero from '../../components/article-hero';
import ArticlesContainer from '../../components/articles-container';


export default class App extends React.Component {
    render() {
        return <div>
            <ArticlesContainer>
                <ArticleHero className='highlight'
                    title="Sample"
                    image="http://3.bp.blogspot.com/-hJb1Hi26RCI/VfktgKgzb2I/AAAAAAAAGOU/Lybs6-4nGDA/s640/049.JPG" />
            </ArticlesContainer>
        </div>;
    }
}
