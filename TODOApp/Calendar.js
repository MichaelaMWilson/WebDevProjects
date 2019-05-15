import {Text, View, StyleSheet} from "react-native";
import React from "react";
import { CalendarList} from 'react-native-calendars';

export default class Calendar extends React.Component {
    render() {
        return (
            <View style={styles.cal}>
            <CalendarList
                horizontal={true}
                pagingEnabled={true}
                scrollEnabled={true}
                monthFormat={'MMMM yyyy'}
                firstDay={0}
                hideArrows={false}
                hideExtraDays={false}

                theme={{
                    todayBackgroundShape: 'dot',
                    todayTextColor: 'white',
                    arrowColor: '#a8d08d',
                    'stylesheet.day.basic': {
                        today: {
                            backgroundColor: '#a8d08d',
                            borderRadius: 16
                        }
                    },
                    calendarBackground: '#F5F5F5'
                }}
             />
             </View>
        );
    }
}

const styles = StyleSheet.create({
    cal:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor: '#F5F5F5'
    }
});
