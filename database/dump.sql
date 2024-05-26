CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    avaliacao REAL DEFAULT 0.0,
    anuncios INTEGER DEFAULT 0,
    foto TEXT,
    descricao TEXT,
    endereco TEXT,
    telefone TEXT,
    permissoes INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS anuncios (
    id SERIAL PRIMARY KEY,
    foto TEXT,
    nome TEXT NOT NULL,
    raca TEXT,
    idade INTEGER,
    descricao TEXT,
    dono_id INTEGER NOT NULL,
    FOREIGN KEY (dono_id) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS denuncias (
    id SERIAL PRIMARY KEY,
    usuario_denunciante_id INTEGER NOT NULL,
    anuncio_denunciado_id INTEGER NOT NULL,
    data DATE NOT NULL,
    motivo TEXT,
    FOREIGN KEY (usuario_denunciante_id) REFERENCES usuarios (id),
    FOREIGN KEY (anuncio_denunciado_id) REFERENCES anuncios (id)
);

