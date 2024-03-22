import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { response } from "express";
import { Observable, map, tap } from "rxjs";


@Injectable()
export class ResponseBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // const responsek = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() => {
        // if (response.success === false) {
        //     response.status(HttpStatus.BAD_REQUEST);
        //   } else {
        //     response.status(HttpStatus.OK);
        //   }
      }),
      map(data => {
        // Добавляем дополнительные поля в тело ответа
        return {
                // message: [],
                // error: null,
                data,
                statusCode: response.statusCode,
                success: 199 < response.statusCode && response.statusCode < 300 
        };
      }),
    );
  }

}


