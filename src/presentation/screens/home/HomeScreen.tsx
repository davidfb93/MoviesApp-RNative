import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';
import { SearchAnything } from '../../components/search/SearchAnything';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies();

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <ScrollView>
      <View style={{ marginTop: top + 20, paddingBottom: 30, backgroundColor: 'black' }}>
        <SearchAnything />

        <Text style={styles.title}>En Cartelera</Text>
        {/* Principal */}
        <PosterCarousel movies={nowPlaying} />

        {/* Populares */}
        <HorizontalCarousel
          movies={popular}
          title="Populares"
          loadNextPage={popularNextPage}
        />

        {/* Top Rated */}
        <HorizontalCarousel movies={topRated} title="Mejor calificadas" />

        {/* Próximamente */}
        <HorizontalCarousel movies={upcoming} title="Próximamente" />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 10,
    marginBottom: 10
  }
})

