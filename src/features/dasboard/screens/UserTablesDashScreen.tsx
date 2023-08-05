import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Row, Table } from 'react-native-reanimated-table';

const UserTablesDashScreen = () => {
  const [state, setState] = useState({
    tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
    widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
  });
  // const state = this.state;
  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Data Tables</Text>

      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={state.widthArr}
                  style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserTablesDashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  dataWrapper: { marginTop: -1 },
  header: { backgroundColor: '#537791', height: 50 },
  headerText: {
    color: '#000',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: { backgroundColor: '#E7E6E1', height: 40 },
  text: { fontWeight: '100', textAlign: 'center' },
});
