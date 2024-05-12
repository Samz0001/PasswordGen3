import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckBox from "react-native-bouncy-checkbox";

''
//Form Validation
import * as Yup from 'yup'
import  {Formik}  from 'formik'
const PasswordSchema = Yup.object().shape({
  passwordLength:Yup.number()
  .min(4,"Should be min of  4 characters")
  .max(16,"Should be max of 16 characters")
  .required("Length is required")
})
export default function App() {
  const [password,setPassword] = useState('')
  const [isPassGenerated,setIsPassGenerated] =useState(false)
  const [lowercase,setLowerCase] = useState(true)
  const[upperCase,setupperCase] = useState(true)
  const [numbers,setNumbers] = useState(false)
  const [symbols,setSymbols] = useState(false)

  const generatePasswordString =(passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvxyz';
    const digitChars = '0123456789';
    const specialChars =  "!@#$%^&*()_+"

    if(upperCase) {
      characterList += upperCaseChars
    }
    if(lowercase) {
      characterList +=lowerCaseChars
    }
    if(numbers) {
      characterList +=digitChars
    }
    if(symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList,passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)

  }

const  createPassword =(characters:string,passwordLength:number) => {
  let result  = ''
  for (let i = 0; i < passwordLength; i++) {
const characterIndex = Math.round(Math.random() * characters.length)
result += characters.charAt(characterIndex)
  }
  return result
  console.log("shyam")
}

const resetPasswordState = () => {
  setPassword("")
  setIsPassGenerated(false)
  setLowerCase(true)
  setupperCase(false)
  setNumbers(false)
  setSymbols(false)
}

  
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength: "" }}
       validationSchema ={PasswordSchema}
       onSubmit={ values => {
        console.log(values)
        generatePasswordString(+values.passwordLength)//TODO
       }}
    
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength &&  (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
           
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 8"
            keyboardType="numeric"
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Lowercase</Text>
          <BouncyCheckBox
          isChecked={lowercase}
          onPress={()=> setLowerCase(!lowercase)}
          fillColor='#29AB87'/>
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Uppercase</Text>
          <BouncyCheckBox
          isChecked={upperCase}
          onPress={()=> setupperCase(!upperCase)}
          fillColor='#29AB87'/>
         </View>

         <View style={styles.inputWrapper}><Text style={styles.heading}>Include Numbers</Text>
          <BouncyCheckBox
          isChecked={numbers}
          onPress={()=> setNumbers(!numbers)}
          fillColor='#29AB87'/></View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Symbols</Text>
          <BouncyCheckBox
          isChecked={symbols}
          onPress={()=> setSymbols(!symbols)}
          fillColor='#29AB87'/>
         </View>
         

         <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
            style={styles.primaryBtn}
            onPress={handleSubmit}
            >
            <Text style={styles.primaryBtnTxt}>
            Generate Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => {
            handleReset()
            resetPasswordState()
          }}>
            <Text style={styles.secondaryBtnTxt}>
            Reset
            </Text>
          </TouchableOpacity>
         </View>


         </>
       )}
     </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card,styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text  selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ): null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
    backgroundColor:"#9b59b6",
    borderColor:"white",
    borderRadius:10,
  
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,    
    
    
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: 'white',
    marginBottom: 8,

  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: 'red',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color:"white"
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    
    
  },
  cardElevated: {
    backgroundColor: '#9b59b6',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});