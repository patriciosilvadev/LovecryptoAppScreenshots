//Importações Externas
import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Avatar, Text , useTheme} from '@ui-kitten/components';
import { SafeAreaView, ScrollView, TouchableNativeFeedback}  from 'react-native';
import * as Animatable from 'react-native-animatable';

//Importações Internas
import { ThemeContext } from '../../theme-context';
import { TopNavigationHeader } from '../shared/topNavigation'
import { showToast } from '../shared/showToast';

export const LinkedAccountsScreen = (props) => {

    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    const theme = useTheme();
  
    const wallet = useSelector(state => state.withdrawState);

    const jumpTo = (type) => {
        if(type == 'fiat'){
            if(wallet.fiatWallet.phone != null){
                props.navigation.navigate('Requestwithdraw', {type: 'fiat'})  
            }else{
                props.navigation.navigate('Addaccount', {type: 'fiat'})
            }
        }else{
            if(wallet.cryptoWallet.id != null){
                props.navigation.navigate('Requestwithdraw', {type: 'crypto'})  
            }else{
                props.navigation.navigate('Addaccount', {type: 'crypto'})
            }
        }  
    }
 
    const Option = ({title, subtitle, type, disabled}) => {
        return(
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple(theme['color-primary-100'])}  onPress={() => disabled ? showToast('Opção indisponível') : jumpTo(type) }>
                <Layout style = {{flexDirection: 'row', padding: 24, justifyContent: 'space-between', borderRadius: 10, borderColor: '#ccc', borderWidth: 1, marginBottom: 24}}>
                    <Layout style = {{flexDirection: 'column', backgroundColor: 'transparent'}}>
                        <Text>{title}</Text>
                        <Text appearance = 'hint' style = {{marginTop: 16}}>{subtitle}</Text>
                    </Layout>
                <Avatar
                    size='giant'
                    source={type =='crypto' ? require('../assets/images/digital_wallet.png') : require('../assets/images/bank_account.png')}
                />
                </Layout>
            </TouchableNativeFeedback> 
        )
    }
 
    return(
        <SafeAreaView
            style={{
            flex: 1,
            height: '100%',
            backgroundColor: currentTheme === 'light' ? 'white' : '#222B45',
            }}>
            <TopNavigationHeader navigation = {props.navigation}  title = 'Tipo de transfêrencia'/>
            <ScrollView>
                <Layout style = {{padding: 24,}}>
                    <Text category='s1'>Escolha como você deseja retirar o saldo da sua conta</Text>
                </Layout>
                <Layout style = {{paddingHorizontal: 24,}}>
                    <Animatable.View  animation="pulse" duration = {1000} style = {{width:'100%', backgroundColor: 'transparent'}}>
                        <Option title = 'Transferencia para crypto wallet' subtitle = 'Transferencia imediata' type = 'crypto' />
                    </Animatable.View>
                    <Animatable.View  animation="pulse" duration = {1500} style = {{width:'100%', backgroundColor: 'transparent'}}>
                        <Option title = 'Transferencia para conta bancária' subtitle = 'Disponível em até 5 dias úteis' type = 'fiat' disabled = {true}/> 
                    </Animatable.View>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    )
};