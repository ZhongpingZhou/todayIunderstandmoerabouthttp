import { Hero } from './hero';

import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService 
{

  private heroesUrl = 'api/heroes';//URL to web api
  //这个api是人家为了演示英雄教程专门帮我们做的
  constructor(private http:Http){}
  getHeroes(): Promise<Hero[]> 
  {
    return this.http.get(this.heroesUrl)
    //这里我们应该怎么理解呢，其实也非常容易理解
    //就是this.http（一个http服务对象由此诞生）
    //.get（采用的是一个方法）
    //（this.heroesUrl）传递一个参数
    /**到此应该返回一个对象，什么样的对象呢，我们一般称之为可观察对象 */
    .toPromise()//很明显，调用了一个可观察对象的toPromise方法，就变成一个一个基于异步的东西
    .then //这里也非常好理解，就是说需要等前面的方法都执行完成后，才执行后面的方法
     (response => response.json().data as Hero[])
     //后面这一句看上去非常的唬人，但是实际上没有什么大不了的，
     //这实际上是JS的匿名函数，
     //等价于
     /**
      * 
      function (response)
      {
        response.json().data as Hero[]
      }
      */
      .catch(this.handleError);
      
      
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }


   private headers = new Headers({'Content-Type': 'application/json'});

    update(hero:Hero):Promise<Hero>
  {
       const url =`${this.heroesUrl}/${hero.id}`;
  //   return this.http.put(url,JSON.stringify(hero),{headers: this.headers})
  //   .toPromise().then(

  //     ()=>hero//很明显了，这个Heo其实就是参数中的hero
  //   ).catch(this.handleError)
    
    

  //   //虽然有点看不懂，但是我们很明显的看到，这里没有response，这是一件非常好的事情不是吗，
  //   //因为它确实不应该有Get


  // }


// update(hero: Hero): Promise<Hero> {
  //const url = `${this.heroesUrl}/${hero.id}`;
  return this.http
    .put(url, JSON.stringify(hero), {headers: this.headers})
    .toPromise()
    .then(() => "fsaf")
    .catch(this.handleError);
    //看上去似乎非常难理解，事实上这也没没啥难以理解的，
    //这里有一个基于Promise的对象，当一个方法调用它的时候，
    //当then前面的方法执行完毕，说明成功，随便返回一下，
    //而调用这个方法的方法接到返回时，立刻执行下一个指令
}

create(name:string):Promise<Hero>
{
  return this.http.post(this.heroesUrl,JSON.stringify({name:name}),
  {headers:this.headers}
).toPromise().then
(res => res.json().data as Hero).catch(this.handleError);


}

}
