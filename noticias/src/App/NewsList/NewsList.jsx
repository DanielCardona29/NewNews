import React from 'react';
import NewsCard from './NewsCard';


class NewsList extends React.Component {


    render() {
        const NewsList = (<NewsCard
            date={'adate'}
            title={'a title'}
            content={'Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor'}
            image={'https://vignette.wikia.nocookie.net/los-simpsom/images/1/18/L.gif/revision/latest/scale-to-width-down/340?cb=20130413024422&path-prefix=es'}
            views={6555}
            comments={555}
            likes={9999}
            dislikes={6666}
        />);

        return NewsList;
    }
}

export default NewsList;