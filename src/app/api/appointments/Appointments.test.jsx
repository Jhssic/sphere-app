describe('Agendamento de Consulta', () => {
  const agendados = ['14:00'];

  function agendar(horario) {
    if (agendados.includes(horario)) throw new Error('Horário ocupado');
    agendados.push(horario);
    return true;
  }

  test('agendamento bem-sucedido em horário livre', () => {
    expect(() => agendar('15:00')).not.toThrow();
  });

  test('erro ao agendar em horário já ocupado', () => {
    expect(() => agendar('14:00')).toThrow('Horário ocupado');
  });

  test('verifica se horário foi adicionado após agendamento', () => {
    agendar('16:00');
    expect(agendados).toContain('16:00');
  });
});
