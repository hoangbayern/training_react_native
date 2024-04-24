import React, {useState} from 'react'
import { View, Text, TextInput } from 'react-native'
import { Icon, Input } from 'react-native-elements';

export const FormInput = ({title, value, placeholder, handleChangeText, leftIcon, errorMessage, otherStyles, ...props}) => {

    const [showPassword, setShowPassword] = useState(false);

  return (
<View className="mb-5">
        <Text className="text-lg text-gray-100 mb-3">{title}</Text>
        <View className="w-full h-16 px-4 bg-sky-800 border-2 border-black rounded-3xl focus:border-emerald-200 items-center">
            <Input className="flex-1 text-white text-base" value={value} placeholder={placeholder} onChangeText={handleChangeText} leftIcon={leftIcon} 
            secureTextEntry ={title === 'Password' && !showPassword} rightIcon={
                title === 'Password' && (
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    type='ionicon'
                    size={24}
                    color='white'
                    onPress={() => setShowPassword(!showPassword)}
                  />
                )
              }
              errorMessage={errorMessage}/>
        </View>
    </View>
  )
}
