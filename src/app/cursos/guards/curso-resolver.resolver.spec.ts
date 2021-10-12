import { TestBed } from '@angular/core/testing';

import { CursoResolverResolver } from './curso-resolver.resolver';

describe('CursoResolverResolver', () => {
  let resolver: CursoResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CursoResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
