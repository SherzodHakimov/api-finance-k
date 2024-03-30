import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      // catchError((error) => {
      //   return of(error);
      // }),
      // tap(() => {
      // if (response.success === false) {
      //     response.status(HttpStatus.BAD_REQUEST);
      //   } else {
      //     response.status(HttpStatus.OK);
      //   }
      // }),
      map((data) => {
          return {
            data,
            statusCode: response.statusCode,
            // message: data.response.message,
            // error: data.response.error,
          };
      }),
    );
  }
}
