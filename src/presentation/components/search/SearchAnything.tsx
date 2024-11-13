import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

export const SearchAnything = () => {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'b23b7fa398f8e2ef84f6483a031a89d0';

  const [searchQuery, setSearchQuery] = useState('');
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setMovies(data.results);
      //console.log(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const groupMoviesInPairs = (movies: Movie[]) => {
    let groupedMovies = [];
    for (let i = 0; i < movies.length; i += 2) {
      groupedMovies.push(movies.slice(i, i + 2));
    }
    return groupedMovies;
  };

  // Renderiza cada película
  const renderItem = ({ item }: { item: Movie[] }) => (
    <View style={styles.row}>
      {item.map((movie) => (
        <View key={movie.id} style={styles.movieItem}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.poster}
          />
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.searchLabel}>Ingrese el titulo a buscar</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar películas..."
        placeholderTextColor="#fff" 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.buttonContainer}>
        <Button title="Buscar" onPress={handleSearch} color="#212529" />
      </View>

      <FlatList
        data={groupMoviesInPairs(movies)} 
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={1} 
        style={{ flex: 1 }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212', 
  },
  searchLabel: {
    color: '#fff', 
    marginBottom: 10,
    fontSize: 19
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff', 
  },
  buttonContainer: {
    marginBottom: 20, 
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '45%', 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', 
    flex: 1, 
  },
});
