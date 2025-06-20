describe('Plano Alimentar', () => {
  let plano = { descricao: 'Dieta leve', calorias: 1800 };

  test('plano contém descrição correta', () => {
    expect(plano.descricao).toBe('Dieta leve');
  });

  test('plano tem valor calórico esperado', () => {
    expect(plano.calorias).toBeGreaterThan(1000);
  });

  test('edita plano corretamente', () => {
    plano.calorias = 1600;
    expect(plano.calorias).toBe(1600);
  });

  test('plano inválido sem calorias', () => {
    const planoInvalido = { descricao: 'Jejum intermitente' };
    expect(planoInvalido.calorias).toBeUndefined();
  });
});
