import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Filters from './Filters';

type Filters2Props = {
    isVisible: boolean;
    onClose: () => void;
    onApply: (filters: {
        priceRange: { min: number; max: number };
        propertyType: string[];
        bedrooms: number;
        bathrooms: number;
    }) => void;
};

const Filters2: React.FC<Filters2Props> = ({ isVisible, onClose, onApply }) => {
    const [priceRange, setPriceRange] = useState({ min: 1000, max: 5000 });
    const [propertyType, setPropertyType] = useState<string[]>([]);
    const [bathrooms, setBathrooms] = useState<number>(1);
    const [bedrooms, setBedrooms] = useState<number>(1);

    const propertyTypes = ['Apartments', 'Townhomes', 'Homes', 'Condos', 'Duplexes', 'Studios'];

    return (
        <Modal
            visible={isVisible}
            animationType='slide'
            transparent
        >
            <View style={styles.modalContainer}>
                <View style={styles.filterContent}>
                    {/* Header */}
                    <ScrollView>
                        <View style={styles.header}>
                            <Text className='text-2xl font-rubik-bold text-black-300'>Lọc</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Text
                                    style={styles.resetText}
                                    className='font-rubik-medium'
                                >
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Price Range */}
                        <View style={styles.section}>
                            <Text
                                style={styles.sectionTitle}
                                className='font-rubik-medium text-black-300'
                            >
                                Khoảng giá
                            </Text>
                            <Slider
                                minimumValue={1000}
                                maximumValue={10000}
                                step={100}
                                value={priceRange.min}
                                onValueChange={(value) =>
                                    setPriceRange({ ...priceRange, min: value })
                                }
                            />
                            <Text>Từ: ${priceRange.min}</Text>
                            <Slider
                                minimumValue={1000}
                                maximumValue={10000}
                                step={100}
                                value={priceRange.max}
                                onValueChange={(value) =>
                                    setPriceRange({ ...priceRange, max: value })
                                }
                            />
                            <Text>Đến: ${priceRange.max}</Text>
                        </View>

                        {/* Property Type */}
                        <View style={styles.section}>
                            <Text
                                style={styles.sectionTitle}
                                className='font-rubik-medium text-black-300'
                            >
                                Kiểu bất động sản
                            </Text>
                            <Filters />
                        </View>

                        {/* Home Details */}
                        <View style={styles.section}>
                            <Text className='font-rubik-medium text-black-300'>Chi tiết</Text>
                            <View className='flex flex-row items-center mt-2'>
                                <Text className='font-rubik text-black-300'>Phòng ngủ</Text>
                                <View className='flex flex-row justify-between items-center gap-3'>
                                    <TouchableOpacity
                                        onPress={() => setBedrooms(bedrooms - 1)}
                                        className='flex flex-col items-start ml-4 px-4 py-2 rounded-full bg-primary-100 border border-black-300'
                                    >
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <Text className='text-base items-center justify-center px-2 py-2'>
                                        {bedrooms}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setBedrooms(bedrooms + 1)}
                                        className='flex flex-col items-start  px-4 py-2 rounded-full bg-primary-100 border border-black-300'
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className='flex flex-row items-center mt-2 '>
                                <Text className='font-rubik text-black-300'>Phòng tắm</Text>
                                <View className='flex flex-row justify-between items-center gap-3'>
                                    <TouchableOpacity
                                        onPress={() => setBathrooms(bathrooms - 1)}
                                        className='flex flex-col items-start ml-4 px-4 py-2 rounded-full bg-primary-100 border border-black-300'
                                    >
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <Text className='text-base items-center justify-center px-2 py-2'>
                                        {bathrooms}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setBathrooms(bathrooms + 1)}
                                        className='flex flex-col items-start  px-4 py-2 rounded-full bg-primary-100 border border-black-300'
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Footer */}
                        <TouchableOpacity
                            className='flex-1 flex flex-row items-center justify-center mt-4 bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400'
                            onPress={() => {
                                onApply({ priceRange, propertyType, bedrooms, bathrooms });
                                onClose();
                            }}
                        >
                            <Text className='text-white text-lg text-center font-rubik-bold'>
                                Tìm kiếm
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'flex-end',
        borderTopColor: '#0061FF',
        borderColor: '#0061FF',
    },
    filterContent: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      borderTopWidth: 2, 
      borderColor: '#0061FF',
  },
  
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    resetText: { color: 'red' },
    section: { marginTop: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold' },
    propertyTypeButton: {
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    propertyTypeSelected: { backgroundColor: '#007BFF' },
    propertyTypeText: { color: '#000' },
    propertyTypeTextSelected: { color: '#fff' },
    incrementButton: {
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: 30,
        height: 25,
    },
    applyButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    applyButtonText: { color: '#fff', textAlign: 'center' },
});

export default Filters2;
