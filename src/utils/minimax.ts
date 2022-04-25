export const minimax = `
  :- use_module(library(lists)).

  vence(P, [P, P, P, _, _, _, _, _, _]).
  vence(P, [_, _, _, P, P, P, _, _, _]).
  vence(P, [_, _, _, _, _, _, P, P, P]).
  vence(P, [P, _, _, P, _, _, P, _, _]).
  vence(P, [_, P, _, _, P, _, _, P, _]).
  vence(P, [_, _, P, _, _, P, _, _, P]).
  vence(P, [P, _, _, _, P, _, _, _, P]).
  vence(P, [_, _, P, _, P, _, P, _, _]).

  tabuleiro_cheio(Tabuleiro) :- member(n, Tabuleiro).

  movimento_possivel(P, [n | Resto], [P | Resto]).
  movimento_possivel(P, [X | Resto], [X | Resto2]) :-
      movimento_possivel(P, Resto, Resto2).

  movimentos_possiveis(P, Tabuleiro, TodosMovimentos) :-
      findall(Movimento, movimento_possivel(P, Tabuleiro, Movimento), TodosMovimentos).

  calcular_tabuleiro([], Valor) :-
      Valor is 0.
  calcular_tabuleiro(Tabuleiro, Valor) :-
      vence(o, Tabuleiro),
      Valor is 1, !.
  calcular_tabuleiro(Tabuleiro, Valor) :-
      vence(x, Tabuleiro),
      Valor is -1, !.
  calcular_tabuleiro(Tabuleiro, Valor) :-
      tabuleiro_cheio(Tabuleiro),
      Valor is 0.

  trocar_jogador(max, min).
  trocar_jogador(min, max).

  comparar_movimentos(max, MovimentoA, ValorA, _, ValorB, MovimentoA, ValorA) :-
    ValorA >= ValorB.
  comparar_movimentos(max, _, ValorA, MovimentoB, ValorB, MovimentoB, ValorB) :-
    ValorA < ValorB.
  comparar_movimentos(min, MovimentoA, ValorA, _, ValorB, MovimentoA, ValorA) :-
    ValorA =< ValorB.
  comparar_movimentos(min, _, ValorA, MovimentoB, ValorB, MovimentoB, ValorB) :-
    ValorA > ValorB.

  melhor_movimento(max, [], [], -2).
  melhor_movimento(min, [], [], 2).
  melhor_movimento(MinMax, [Movimento | MovimentosRestantes], MelhorMovimento, MelhorValor) :-
    calcular_tabuleiro(Movimento, ValorMoviemento),
    melhor_movimento(MinMax, MovimentosRestantes, MelhorMovimentoAtual, MelhorValorAtual),
    comparar_movimentos(MinMax, Movimento, ValorMoviemento, MelhorMovimentoAtual, MelhorValorAtual, MelhorMovimento, MelhorValor).
    melhor_movimento(MinMax, [Movimento | MovimentosRestantes], MelhorMovimento, MelhorValor) :-
    melhor_movimento(MinMax, MovimentosRestantes, MelhorMovimentoAtual, MelhorValorAtual),
    trocar_jogador(MinMax, OutroTurno),
    executar_minimax(OutroTurno, Movimento, _, PiorValorMovimento),
    comparar_movimentos(MinMax, Movimento, PiorValorMovimento, MelhorMovimentoAtual, MelhorValorAtual, MelhorMovimento, MelhorValor).

  jogador(max, o).
  jogador(min, x).

  executar_minimax(MinMax, Tabuleiro, MelhorMovimento, MelhorValor) :-
    jogador(MinMax, Turno),
    movimentos_possiveis(Turno, Tabuleiro, TodosMovimentos),
    melhor_movimento(MinMax, TodosMovimentos, MelhorMovimento, MelhorValor).
              
  minimax(Tabuleiro, MelhorMovimento) :- executar_minimax(max, Tabuleiro, MelhorMovimento, _), !.
`;
