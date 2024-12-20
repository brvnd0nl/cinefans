PGDMP  "    9            
    |            cinefans    17.1    17.1 D               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16388    cinefans    DATABASE     ~   CREATE DATABASE cinefans WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE cinefans;
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1259    16416 	   favorites    TABLE     f   CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer,
    movie_id integer
);
    DROP TABLE public.favorites;
       public         heap r       postgres    false    4            �            1259    16415    favorites_id_seq    SEQUENCE     �   CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.favorites_id_seq;
       public               postgres    false    4    222                       0    0    favorites_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;
          public               postgres    false    221            �            1259    16406    movies    TABLE     t  CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    release_year integer,
    duration integer,
    genre character varying(100),
    director character varying(100),
    synopsis text,
    trailer_url character varying(255),
    rating numeric(3,1),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.movies;
       public         heap r       postgres    false    4            �            1259    16405    movies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.movies_id_seq;
       public               postgres    false    220    4                       0    0    movies_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;
          public               postgres    false    219            �            1259    16493    news    TABLE     �   CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.news;
       public         heap r       postgres    false    4            �            1259    16492    news_id_seq    SEQUENCE     �   CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.news_id_seq;
       public               postgres    false    230    4                       0    0    news_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;
          public               postgres    false    229            �            1259    16474    related_movies    TABLE     t   CREATE TABLE public.related_movies (
    id integer NOT NULL,
    movie_id integer,
    related_movie_id integer
);
 "   DROP TABLE public.related_movies;
       public         heap r       postgres    false    4            �            1259    16473    related_movies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.related_movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.related_movies_id_seq;
       public               postgres    false    4    228                       0    0    related_movies_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.related_movies_id_seq OWNED BY public.related_movies.id;
          public               postgres    false    227            �            1259    16454    reviews    TABLE     �   CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    movie_id integer,
    content text NOT NULL,
    rating numeric(3,1),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.reviews;
       public         heap r       postgres    false    4            �            1259    16453    reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public               postgres    false    4    226                       0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public               postgres    false    225            �            1259    16394    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap r       postgres    false    4            �            1259    16393    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    4    218                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            �            1259    16435 	   watchlist    TABLE     f   CREATE TABLE public.watchlist (
    id integer NOT NULL,
    user_id integer,
    movie_id integer
);
    DROP TABLE public.watchlist;
       public         heap r       postgres    false    4            �            1259    16434    watchlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.watchlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.watchlist_id_seq;
       public               postgres    false    4    224                       0    0    watchlist_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.watchlist_id_seq OWNED BY public.watchlist.id;
          public               postgres    false    223            C           2604    16419    favorites id    DEFAULT     l   ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);
 ;   ALTER TABLE public.favorites ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            A           2604    16409 	   movies id    DEFAULT     f   ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);
 8   ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            H           2604    16496    news id    DEFAULT     b   ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);
 6   ALTER TABLE public.news ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    229    230            G           2604    16477    related_movies id    DEFAULT     v   ALTER TABLE ONLY public.related_movies ALTER COLUMN id SET DEFAULT nextval('public.related_movies_id_seq'::regclass);
 @   ALTER TABLE public.related_movies ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    228    228            E           2604    16457 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            ?           2604    16397    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            D           2604    16438    watchlist id    DEFAULT     l   ALTER TABLE ONLY public.watchlist ALTER COLUMN id SET DEFAULT nextval('public.watchlist_id_seq'::regclass);
 ;   ALTER TABLE public.watchlist ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224                       0    16416 	   favorites 
   TABLE DATA                 public               postgres    false    222   qM       �          0    16406    movies 
   TABLE DATA                 public               postgres    false    220   �M                 0    16493    news 
   TABLE DATA                 public               postgres    false    230   �M                 0    16474    related_movies 
   TABLE DATA                 public               postgres    false    228   �M                 0    16454    reviews 
   TABLE DATA                 public               postgres    false    226   �M       �          0    16394    users 
   TABLE DATA                 public               postgres    false    218   �M                 0    16435 	   watchlist 
   TABLE DATA                 public               postgres    false    224   N                  0    0    favorites_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.favorites_id_seq', 1, false);
          public               postgres    false    221                       0    0    movies_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.movies_id_seq', 1, false);
          public               postgres    false    219                       0    0    news_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.news_id_seq', 1, false);
          public               postgres    false    229                       0    0    related_movies_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.related_movies_id_seq', 1, false);
          public               postgres    false    227                       0    0    reviews_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);
          public               postgres    false    225                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public               postgres    false    217                       0    0    watchlist_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.watchlist_id_seq', 1, false);
          public               postgres    false    223            S           2606    16421    favorites favorites_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_pkey;
       public                 postgres    false    222            U           2606    16423 (   favorites favorites_user_id_movie_id_key 
   CONSTRAINT     p   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_movie_id_key UNIQUE (user_id, movie_id);
 R   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_user_id_movie_id_key;
       public                 postgres    false    222    222            Q           2606    16414    movies movies_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.movies DROP CONSTRAINT movies_pkey;
       public                 postgres    false    220            a           2606    16501    news news_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.news DROP CONSTRAINT news_pkey;
       public                 postgres    false    230            ]           2606    16481 ;   related_movies related_movies_movie_id_related_movie_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.related_movies
    ADD CONSTRAINT related_movies_movie_id_related_movie_id_key UNIQUE (movie_id, related_movie_id);
 e   ALTER TABLE ONLY public.related_movies DROP CONSTRAINT related_movies_movie_id_related_movie_id_key;
       public                 postgres    false    228    228            _           2606    16479 "   related_movies related_movies_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.related_movies
    ADD CONSTRAINT related_movies_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.related_movies DROP CONSTRAINT related_movies_pkey;
       public                 postgres    false    228            [           2606    16462    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public                 postgres    false    226            K           2606    16404    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            M           2606    16400    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            O           2606    16402    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 postgres    false    218            W           2606    16440    watchlist watchlist_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.watchlist DROP CONSTRAINT watchlist_pkey;
       public                 postgres    false    224            Y           2606    16442 (   watchlist watchlist_user_id_movie_id_key 
   CONSTRAINT     p   ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_user_id_movie_id_key UNIQUE (user_id, movie_id);
 R   ALTER TABLE ONLY public.watchlist DROP CONSTRAINT watchlist_user_id_movie_id_key;
       public                 postgres    false    224    224            b           2606    16429 !   favorites favorites_movie_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_movie_id_fkey;
       public               postgres    false    4689    220    222            c           2606    16424     favorites favorites_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_user_id_fkey;
       public               postgres    false    218    222    4685            h           2606    16482 +   related_movies related_movies_movie_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.related_movies
    ADD CONSTRAINT related_movies_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id) ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.related_movies DROP CONSTRAINT related_movies_movie_id_fkey;
       public               postgres    false    228    4689    220            i           2606    16487 3   related_movies related_movies_related_movie_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.related_movies
    ADD CONSTRAINT related_movies_related_movie_id_fkey FOREIGN KEY (related_movie_id) REFERENCES public.movies(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.related_movies DROP CONSTRAINT related_movies_related_movie_id_fkey;
       public               postgres    false    4689    220    228            f           2606    16468    reviews reviews_movie_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_movie_id_fkey;
       public               postgres    false    220    4689    226            g           2606    16463    reviews reviews_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public               postgres    false    218    226    4685            d           2606    16448 !   watchlist watchlist_movie_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.watchlist DROP CONSTRAINT watchlist_movie_id_fkey;
       public               postgres    false    4689    220    224            e           2606    16443     watchlist watchlist_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.watchlist DROP CONSTRAINT watchlist_user_id_fkey;
       public               postgres    false    218    4685    224                
   x���          �   
   x���             
   x���             
   x���             
   x���          �   
   x���             
   x���         