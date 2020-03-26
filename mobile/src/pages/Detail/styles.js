import { StyleSheet } from 'react-native';
import Constans from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constans.statusBarHeight + 20,

    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    event: {
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#FFF',
        marginBottom: 16,
        marginTop: 48,
    },
    eventProperty: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#41414d',
        marginTop: 24,
    },
    eventValue: {
        marginTop: 8,
        fontSize: 15,
        color: '#737380',
    },
    contactBox:{
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#FFF',
        marginBottom: 16,
    },
    contactTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30,
    },
    contactDescription:{
        fontSize: 15,
        color: '#737380',
        marginTop: 16,
    },
    actions:{
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    action:{
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionText:{
        color: '#FFF',
        fontWeight: 'bold'
    }
});