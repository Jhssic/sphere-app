describe('Cadastro de Paciente', () => {
  function cadastrarPaciente({ nome, idade, peso }) {
    if (!nome || !idade || !peso) throw new Error('Campos obrigatórios não preenchidos');
    return { id: 1, nome, idade, peso };
  }

  test('cadastra paciente com sucesso', () => {
    const paciente = cadastrarPaciente({ nome: 'Ana', idade: 29, peso: 65 });
    expect(paciente).toHaveProperty('id');
  });

  test('erro ao cadastrar paciente sem nome', () => {
    expect(() => cadastrarPaciente({ nome: '', idade: 29, peso: 65 })).toThrow();
  });

  test('erro ao cadastrar paciente sem idade', () => {
    expect(() => cadastrarPaciente({ nome: 'Ana', idade: null, peso: 65 })).toThrow();
  });

  test('erro ao cadastrar paciente sem peso', () => {
    expect(() => cadastrarPaciente({ nome: 'Ana', idade: 29, peso: null })).toThrow();
  });
});
