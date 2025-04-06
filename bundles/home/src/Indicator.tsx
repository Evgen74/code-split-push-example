import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

type Props = {
    title?: string;
}

export const Indicator:FC<Props> = ({title}) => (
    <View style={[styles.container, styles.horizontal]}>
        <View style={styles.block}>
            <ActivityIndicator size="small" color="#0000ff" />
            {title ? <Text>{`Загрузка ${title}`}</Text> : null }

        </View>

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    block: {
        justifyContent: "center"
    }
});
