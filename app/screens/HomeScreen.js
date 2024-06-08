import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import { AntDesign } from "@expo/vector-icons";
import newsApi from "../api/newsApi";
import colors from "../config/colors";
import { Entypo } from "@expo/vector-icons";
import NewsComponent from "../components/NewsComponent";
import routes from "../navigation/routes";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState(null);
  const [Trending, setTrending] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeAll, setSeeAll] = useState(false);
  const handleLogoPress = () => {
    navigation.navigate(routes.USER);
  };
  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past; // difference in milliseconds

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    if (diff < msPerMinute) {
      const seconds = Math.round(diff / 1000);
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    } else if (diff < msPerHour) {
      const minutes = Math.round(diff / msPerMinute);
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (diff < msPerDay) {
      const hours = Math.round(diff / msPerHour);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (diff < msPerMonth) {
      const days = Math.round(diff / msPerDay);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (diff < msPerYear) {
      const months = Math.round(diff / msPerMonth);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else {
      const years = Math.round(diff / msPerYear);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  }
  const fetchNews = async () => {
    try {
      const response = await newsApi.getNews("tesla");
      // console.log("response", response);
      if (response.ok) {
        setNews(response.data.articles);
        setTrending(response.data.articles[0]);
        // console.log("Trending", response.data.articles[0]);
      }
    } catch (error) {
      console.log("Error fetching news", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <Screen style={{ marginBottom: 130 }}>
      <View
        style={{
          marginLeft: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 20,
        }}
      >
        <TouchableOpacity onPress={handleLogoPress}>
          <Image
            source={require("../assests/NewsAppLogo.jpeg")}
            style={{ width: 100, height: 50 }}
          />
        </TouchableOpacity>
        <Ionicons name="notifications-outline" size={40} color="black" />
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
        />

        {(!searchText || searchText == "") && (
          <View style={{ position: "absolute", marginLeft: 6 }}>
            <AntDesign name="search1" size={24} color="black" />
          </View>
        )}
        {!searchText && (
          <View style={{ marginLeft: 200 }}>
            <Ionicons name="filter" size={24} color="black" />
          </View>
        )}
      </View>
      {loading && (
        <View style={{ alignSelf: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      {!loading && (
        <>
          {!seeAll && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 25,
                marginRight: 25,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: colors.black,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Trending
              </Text>
              <Text>See all</Text>
            </View>
          )}
          {Trending && !seeAll && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.NEWS_DETAILED_SCREEN, {
                  title: Trending.title,
                  source: Trending.source,
                  urlToImage: Trending.urlToImage,
                  publishedAt: Trending.publishedAt,
                  content: Trending.content,
                  url: Trending.url,
                });
              }}
            >
              {Trending.urlToImage && (
                <View style={{ alignSelf: "center" }}>
                  <Image
                    source={{ uri: Trending.urlToImage }}
                    style={{ width: 320, height: 160 }}
                    alt="news image"
                    onError={() => console.error("Image failed to load")}
                  />
                </View>
              )}
              <View
                style={{
                  margin: 20,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  {Trending.title}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                  marginRight: 20,
                  justifyContent: "space-between",
                }}
              >
                <Text>{Trending.source?.name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    marginLeft: 150,
                  }}
                >
                  <Entypo name="back-in-time" size={20} color={colors.star1} />
                  <Text style={{ marginLeft: 10 }}>
                    {Trending && timeAgo(Trending.publishedAt)}
                  </Text>
                </View>
                <Text>...</Text>
              </View>
            </TouchableOpacity>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 26,
            }}
          >
            <Text
              style={{ color: colors.black, fontWeight: "bold", fontSize: 15 }}
            >
              Latest
            </Text>
            <TouchableOpacity onPress={() => setSeeAll(!seeAll)}>
              {!seeAll ? <Text>See all</Text> : <Text>See less</Text>}
            </TouchableOpacity>
          </View>
          {/* {Trending && <NewsComponent {...Trending} />} */}
          {news && (
            <FlatList
              data={news}
              keyExtractor={(item, index) => item.url + index}
              renderItem={({ item }) => (
                <NewsComponent {...item} navigation={navigation} />
              )}
            />
          )}
        </>
      )}
    </Screen>
  );
}
const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 7,
    padding: 5,
    margin: 20,
    paddingLeft: 35,
  },
});
export default HomeScreen;
