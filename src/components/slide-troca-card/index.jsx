import React from 'react'

const slideSecundary = () => {
  return (
     <section className="prato-principal" id="prato-principal">
                    <h2 className="titulo-secao">Prato Principal</h2>
                    <div className="cards-prato-principal">
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                  <LoaderSkeletonCard key={i} />
                              ))
                            : Array.isArray(receitas) &&
                              receitas
                                  .filter(function (receita) {
                                      return (
                                          receita.categoria.toLowerCase() ===
                                          "prato principal"
                                      );
                                  })
                                  .map((receita) => (
                                      <Card
                                          _id={receita._id}
                                          key={receita._id}
                                          src={receita.imagem}
                                          alt={
                                              "imagem da receita de " +
                                              receita.titulo
                                          }
                                          titulo={receita.titulo}
                                          tempoPreparo={`${receita.tempoPreparo} min`}
                                          complexidade={`${receita.complexidade}`}
                                          porcoes={`${receita.porcoes}`}
                                      />
                                  ))}
                    </div>
                </section>
  )
}

export default slideSecundary
