import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SlazyService } from '../slazy.service';
export declare class SlazyInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly slazyService;
    constructor(reflector: Reflector, // Reflector로 메타데이터 접근
    slazyService: SlazyService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
//# sourceMappingURL=slazy.interceptor.d.ts.map