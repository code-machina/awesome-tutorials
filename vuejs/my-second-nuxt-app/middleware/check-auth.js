  export default function(context){
    console.log('[Middleware] Check Auth..')
    if(process.client){ // 클라이언트 영역
      console.log('클라이언트 영역  입니다.');
      console.log(context);
      context.store.dispatch('initAuth', null);
    }else{ // 서버 영역
      console.log('서버 영역  입니다.');
      console.log(context);
      context.store.dispatch('initAuth', context.req);
    }
  }