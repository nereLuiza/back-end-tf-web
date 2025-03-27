import pkg from "pg";
const { Pool } = pkg;

async function connect() {
  const pool = new Pool({
    connectionString: process.env.URL_DB,
  });
  return pool.connect();
}

async function autenticarAdmin(email, senha) {
  const client = await connect();
  const query = "SELECT * FROM Admin WHERE email_admin = $1 AND senha_admin = $2";
  const admin = [email, senha];
  const res = await client.query(query, admin);
  return res.rows[0];
}

async function selectCursos() {
  const client = await connect();
  const res = await client.query("SELECT * FROM Cursos");
  return res.rows;
}

async function insertCurso(data) {
  const client = await connect();
  const query = "INSERT INTO Cursos (code_curso, nome_curso, desc_curso, mcc, ppc) VALUES ($1, $2, $3, $4, $5)";
  const curso = [data.code_curso, data.nome_curso, data.desc_curso, data.mcc, data.ppc];
  await client.query(query, curso);
  client.release();
}

async function deleteCurso(id) {
  const client = await connect();
  const query = "DELETE FROM Cursos WHERE id = $1";
  await client.query(query, [id]);
  client.release();
}

async function updateCurso(id, data) {
  const client = await connect();
  const query = "UPDATE Cursos SET nome_curso = $1, desc_curso = $2, mcc = $3, ppc = $4 WHERE id = $5";
  const curso = [data.nome_curso, data.desc_curso, data.mcc, data.ppc, id];
  await client.query(query, curso);
  client.release();
}

async function selectPgt() {
  const client = await connect();
  const res = await client.query("SELECT * FROM Perguntas");
  return res.rows;
}

async function insertPgt(data, datalt) {
  const client = await connect();

  try {
      await client.query("BEGIN");

      const query = "INSERT INTO Perguntas (num_pgt, conteudo) VALUES ($1, $2) RETURNING num_pgt";
      const perguntaValues = [data.num_pgt, data.conteudo];
      const res = await client.query(query, perguntaValues);
      const num_pgt = res.rows[0].num_pgt;

      for (const alternativa of datalt) {
          const query2 = "INSERT INTO Alternativas (num_pgt, valor, conteudo) VALUES ($1, $2, $3)";
          const alternativaValues = [num_pgt, alternativa.valor, alternativa.conteudo];
          await client.query(query2, alternativaValues);
      }

      await client.query("COMMIT");
      client.release();

  } catch (error) {
      await client.query("ROLLBACK");
      client.release();
      throw error;
  }
}

async function updatePgt(data, datalt, id) {
  const client = await connect();

  try {
      await client.query("BEGIN");

      const query = "UPDATE Perguntas SET conteudo = $1 WHERE num_pgt = $2";
      await client.query(query, [data.conteudo, id]);

      const deleteAlternativasQuery = "DELETE FROM Alternativas WHERE num_pgt = $1";
      await client.query(deleteAlternativasQuery, [id]);

      for (const alternativa of datalt) {
          const query2 = "INSERT INTO Alternativas (num_pgt, valor, conteudo) VALUES ($1, $2, $3)";
          await client.query(query2, [id, alternativa.valor, alternativa.conteudo]);
      }

      await client.query("COMMIT");
      client.release();

  } catch (error) {
      await client.query("ROLLBACK");
      client.release();
      throw error;
  }
}

async function deletePgt(id) {
  const client = await connect();

  try {
    await client.query("BEGIN");

    const deleteAlternativasQuery = "DELETE FROM Alternativas WHERE num_pgt = $1";
    await client.query(deleteAlternativasQuery, [id]);

    const deletePerguntaQuery = "DELETE FROM Perguntas WHERE num_pgt = $1";
    await client.query(deletePerguntaQuery, [id]);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function selectImgs() {
  const client = await connect();
  const res = await client.query("SELECT * FROM Imagens");
  return res.rows;
}

async function insertImg(data) {
  const client = await connect();
  const query = "INSERT INTO Imagens (code_img, atalho) VALUES ($1, $2)";
  const imagem = [data.code_img, data.atalho];
  await client.query(query, imagem);
  client.release();
}

async function updateImg(data, id) {
  const client = await connect();
  const query = "UPDATE Imagens SET atalho = $1 WHERE code_img = $2";
  const pergunta = [data.atalho, id];
  await client.query(query, pergunta);
  client.release();
}

async function deleteImg(id) {
  const client = await connect();
  const query = "DELETE FROM Imagens WHERE code_img = $1";
  await client.query(query, [id]);
  client.release();
}

export {
  autenticarAdmin,
  deleteCurso, insertCurso, selectCursos, updateCurso,
  deletePgt, insertPgt, selectPgt, updatePgt,
  deleteImg, selectImgs, updateImg, insertImg
};