<template>
  <div class="text-moralis-gray">
    <img alt="Moralis logo" src="./assets/logo.svg">
    <div class="mt-4">
      <div class="text-xl font-semibold">Moralis starter boilerplate v4</div>
      <div class="text-sm mt-1 text-moralis-green font-semibold">Powered by Vue.js</div>
      account:{{account}}
<button @click="connectMetamast">connectMetamast</button>
              <button @click="loginM">Connect walletMMM...</button>
              <button @click="addToken">addToken</button>
    </div>
    <div class="mt-10">
      <button @click="switchNetwork" >Switch network</button>
          <button @click="switchNetworkM" >Switch networkM</button>
      <template v-if="isAuthenticated">
        {{ user.get('ethAddress') }} <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <button @click="login">Connect wallet...</button>
      </template>
    </div>
  </div>
</template>

<script>
import { onMounted, inject, computed, ref } from 'vue'
import { useStore } from 'vuex'
/* import Moralis from 'moralis'; */

export default {
  name: 'App',
  setup() {
    let account = ref()
/*     Moralis.initialize('xeefjYVA5VAUT2XHxLnax6v25kM6jLoQJWvzIoJVPkJfyo9rpyUnt4RtAKjVmjQi');
    Moralis.serverURL = 'https://qqmhgwptk8vf.usemoralis.com:2053/server'; */
    const store = useStore()
    const $moralis = inject('$moralis')

    const setUser = (payload) => store.commit('setUser', payload)
    
    const login = async () => {
      const user = await $moralis.Web3.authenticate({provider:"walletconnect"})
      console.log(user?.attributes?.ethAddress,'user.attributes.ethAddress')
      setUser(user)
    }

       const loginM = async () => {
      const user = await $moralis.Web3.authenticate()
      console.log(user?.attributes?.ethAddress,'user.attributes.ethAddress')
      setUser(user)
    }

    const logout = async () => {
      await $moralis.User.logOut()
      setUser({})
    }

    const handleCurrentUser = () => {
      const user = $moralis.User.current()
      if (user) {
        setUser(user)
      }
    }

const connectMetamast = async () =>{
  try {
      const web3 = await $moralis.Web3.enable();
         console.log(web3,'web3 here');
         
      const accounts =  await web3.currentProvider.request({
          method: 'eth_requestAccounts',
        });
        account.value = accounts
        console.log(accounts,'the account here');
    
  } catch (error) {
    console.error(error)
  }
  
}
    const switchNetwork = async () =>{
       try {
         const web3 = await $moralis.Web3.enable({provider:"walletconnect"});
         console.log(web3,'web3 here');
          await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }]
          });
        } catch (error) {
          alert(error.message);
        }
    }


    const addToken = async () => {
      try {
        const web3 = await $moralis.Web3.enable();
        console.log(web3,'the bwe3');
        return web3.currentProvider
          .request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: '0x8ff36c854d901620476230dd8fba6780ad44c58a', // The address that the token is at.
                symbol: 'GTR', // A ticket symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                //image: 'https://gigs.gig-gly.com/icons/gig-gly-coin2.png', // A string url of the token logo // giggly-color.png
              },
            },
          })
          .then((success) => {
            if (success) {
              console.log('GTR token successfully added to wallet!', success);
              return true;
            }
            return false;
          })
          .catch(console.error);
      } catch (error) {
        throw Error(`addGtrTokenToWallet(): ${error}`);
      }
    };

      const switchNetworkM = async () =>{
       try {
         const web3 = await $moralis.Web3.enable();
         console.log(web3,'web3 here');
          await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }]
          });
        } catch (error) {
          alert(error.message);
        }
    }

    onMounted(() => {
      handleCurrentUser()
    })

    return {
      login,
      loginM,
      logout,
      connectMetamast,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      user: computed(() => store.state.user),
      switchNetwork,
            switchNetworkM,
            addToken,
            account
    }
  }
}
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
}

.text-center { text-align: center; }
.text-moralis-green { color: #b7e803; }
.text-moralis-gray { color: #041836; }
.mt-4 { margin-top: 20px }
.mt-1 { margin-top: 4px }
.mt-10 { margin-top: 40px }
.text-xl { font-size: 28px; }
.text-base { font-size: 16px; }
.font-semibold { font-weight: 600; }

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
