import { useInfiniteQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import DogCard from "../components/DogCard";
import useFetchDogs from "../hooks/useFetchDogs";

const Home = () => {
    const { data, isLoading, isError, hasNextPage, fetchNextPage } = useFetchDogs();

    const loadNext = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    // Check if data is undefined or null
    if (!data) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    // Flatten the data from all pages
    const flattenData = data.pages?.flatMap((page) => page.data) || [];

    if (isError) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>An error occurred while fetching data</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ddd' }}>
            <View style={{ height: '98%' }}>
                <FlashList
                    keyExtractor={(item) => item.id}
                    data={flattenData}
                    renderItem={({ item }) => (
                        <Text style={{ backgroundColor: '#fff', borderRadius: 7, elevation: 4, margin: '2%', padding: 15, borderColor: '#000', borderWidth: 1, fontSize: 20, fontWeight: 'bold' }}>{item.name + ' - ' + item.id}</Text>
                    )}
                    onEndReached={loadNext}
                    onEndReachedThreshold={0.2}
                    estimatedItemSize={100}
                    ListFooterComponent={() => (
                        isLoading &&(
                            <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require("../assets/loadingapp.gif")}
                                style={{ borderWidth: 1, justifyContent: 'center', width: 30, height: 30, alignItems: 'center', flex: 0.2 }}
                                resizeMode="contain">
                            </Image>
                          </View>
                           )
                           
                        )}
                />
            </View>
        </SafeAreaView>
    );
};

export default Home;
