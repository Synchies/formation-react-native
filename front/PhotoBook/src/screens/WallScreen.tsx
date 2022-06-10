import React from 'react';
import {Image, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import ArticleList from '../articles/ArticleList';
import NewArticle from '../articles/NewArticle';
import {backEndUrl} from '../env';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  selectArticleStatus,
  fetchAllArticles,
} from '../redux/slices/articles.slice';

const WallScreen = () => {
  const dispatch = useAppDispatch();
  const articleStatus = useAppSelector(selectArticleStatus);
  const onRefresh = () => {
    dispatch(fetchAllArticles());
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={articleStatus === 'loading'}
          onRefresh={onRefresh}
        />
      }>
      <Image
        style={styles.image}
        source={{uri: backEndUrl + '/images/wall.jpg'}}
      />
      <NewArticle />
      <ArticleList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  mainContainer: {
    //alignItems: 'center',
    height: '100%',
  },
  image: {
    height: 300,
    width: '100%',
  },
});

export default WallScreen;
