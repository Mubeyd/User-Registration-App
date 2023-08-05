import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart, ProgressChart } from 'react-native-chart-kit';
import { palette, screenWidth } from '../../../constants/Layout';

const chartConfig = {
  backgroundColor: '#7EAA92',
  backgroundGradientFrom: '#9ED2BE',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const data = {
  labels: ['Swim', 'Bike', 'Run'], // optional
  data: [0.4, 0.6, 0.8],
};

const data2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const data3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
};

const ChartsDashScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: palette.mainColor,
            fontWeight: '600',
          }}>
          Charts dash screen
        </Text>
        <LineChart
          data={data3}
          width={screenWidth - 10} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={styles.chartItem}
        />

        <ProgressChart
          data={data}
          width={screenWidth - 10}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
          style={styles.chartItem}
        />

        <BarChart
          style={styles.chartItem}
          data={data2}
          width={screenWidth - 10}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </View>
    </ScrollView>
  );
};

export default ChartsDashScreen;

const styles = StyleSheet.create({
  chartItem: {
    borderRadius: 16,
    marginHorizontal: 8,
    marginVertical: 8,
  },
});
