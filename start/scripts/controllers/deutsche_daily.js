(function () {
  'use strict';
  define(['app'], function (smc) {
    
    return {
      getDeutsche:function() {
        return [
          ['你来自哪儿','Woher kommen sie?'],
          ['你是什么国籍','Was ist Ihre Nationalität?'],
          ['你祖国是哪儿','Welches ist Ihr Vaterland?'],
          ['你是中国人吗','Sind Sie Chinese?'],
          ['中国有多少人口','Wie viele Einwohner hat China?']
        ];
      }
    }
    
  });
})(this);