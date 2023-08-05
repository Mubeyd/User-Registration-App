import React, { useCallback, useState } from 'react';
import {
  Button,
  Dimensions,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const width = Dimensions.get('screen').width;

interface Props {
  data: any[];
  selectedOptions: any[] | any | undefined;
  multiple?: boolean;
  onSelect: (selectedItem: any[] | any | undefined) => void;
  confirm?: boolean;
  uniqKey: string;
  controllerStyle?: StyleProp<ViewStyle>;
  nameField: string;
}

export default React.memo(ItemsSelect);

function ItemsSelect(props: Props) {
  const { data, multiple, onSelect, selectedOptions, confirm, uniqKey, controllerStyle, nameField } = props;
  const [opened, setOpened] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const onLayoutPress = useCallback(e => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const onItemSelect = useCallback(
    (isSelectedInMulti: boolean | undefined, item: any) => {
      if (multiple) {
        const old = selectedOptions;

        if (old && typeof old === 'object' && !isSelectedInMulti) {
          onSelect([...(old as any[]), item]);
          return;
        } else if (!old) {
          console.log('This');
          onSelect([item]);
          return;
        } else if (isSelectedInMulti) {
          onSelect((old as any[]).filter(it => it[nameField] !== item[nameField]));
          return;
        }
      } else {
        if (selectedOptions && (selectedOptions as any)[nameField] === item[nameField]) {
          onSelect(undefined);
        } else {
          onSelect(item);
        }
      }
      setOpened(false);
    },
    [multiple, nameField, onSelect, selectedOptions],
  );

  return (
    <View>
      <TouchableOpacity onPress={toggleOpen} activeOpacity={0.6}>
        <View style={[styles.controller, { ...(controllerStyle ?? {}) }]}>
          <View style={styles.itemsName}>
            {!multiple && selectedOptions !== undefined ? (
              <View style={styles.singleItemBox}>
                <Text style={{ color: '#414141' }}>{(selectedOptions as any)[nameField] ?? 'Not Slected'}</Text>
              </View>
            ) : null}

            {multiple && selectedOptions !== undefined
              ? (selectedOptions as any[]).map((st, idx) => {
                  return (
                    <View key={idx} style={styles.selectedItemBox}>
                      <Text> {st[nameField]}</Text>
                    </View>
                  );
                })
              : null}
          </View>

          <View style={styles.toggleIcon}>
            <FontAwesome5 name="chevron-up" size={12} color="#8f9bb3" />
          </View>
        </View>
      </TouchableOpacity>

      {opened && (
        <Modal visible={opened} transparent={true} onDismiss={toggleOpen}>
          <TouchableOpacity activeOpacity={0} style={styles.modalContainer} onPress={toggleOpen}>
            <View style={styles.modalBox}>
              <TouchableWithoutFeedback onLayout={onLayoutPress}>
                <React.Fragment>
                  <ScrollView>
                    {(data as any[]).map(x => {
                      const isSelectedInMulti =
                        multiple &&
                        selectedOptions &&
                        (selectedOptions as any[]).find(v => v[uniqKey as 'value'] === x[uniqKey as 'value']) !==
                          undefined;

                      const isSelected =
                        selectedOptions &&
                        !multiple &&
                        (selectedOptions as any)[uniqKey as 'value'] === x[uniqKey as 'value'];

                      return (
                        <TouchableOpacity
                          key={x[uniqKey as 'value']}
                          style={styles.option}
                          onPress={() => onItemSelect(isSelectedInMulti, x)}>
                          <View style={styles.optionValue}>
                            <Text style={styles.optionValueText}> {x[nameField]} </Text>
                          </View>

                          <View style={styles.selectedCheck}>
                            {(isSelectedInMulti || isSelected) && (
                              <View>
                                <AntDesign name="check" size={18} color="#414141" />
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  {confirm && <Button title={'confirm'} onPress={toggleOpen} />}
                </React.Fragment>
              </TouchableWithoutFeedback>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  controller: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 4,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: 40,
    justifyContent: 'space-between',
    minHeight: 40,
    minWidth: width - 320,
  },
  itemsName: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    minHeight: 28,
  },
  modalBox: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 5,
    margin: 24,
    maxHeight: 450,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  option: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  optionValue: { display: 'flex' },
  optionValueText: { color: '#414141', display: 'flex' },
  selectedCheck: { display: 'flex' },
  selectedItemBox: {
    borderColor: '#DDD',
    borderRadius: 5,
    borderWidth: 1,
    display: 'flex',
    marginHorizontal: 2,
    margin: 4,
    padding: 4,
  },
  singleItemBox: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    margin: 8,
    minHeight: 28,
  },
  toggleIcon: {
    alignItems: 'center',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    padding: 12,
  },
});
