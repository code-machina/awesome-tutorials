  export default function(context){
    console.log('[Middleware] Check Auth..')
    if(process.client){
      context.store.dispatch('initAuth', null);
    }else{
      context.store.dispatch('initAuth', context.req);
    }
  }