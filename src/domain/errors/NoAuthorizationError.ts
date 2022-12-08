export class NoAuthError extends Error {
  constructor() {
    super('Sem autorização');
    this.name = 'NoAuthError';
  }
}
