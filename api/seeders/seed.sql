INSERT INTO tournaments (name, date, "registrationDeadline", server, "createdAt", "updatedAt")
VALUES ('tournament1', '2016-01-10 09:00', '2016-01-11 09:00', 'NA', '2016-01-10 09:00', '2016-01-10 09:00');

INSERT INTO teams (name, members, "createdAt", "updatedAt", "TournamentId")
VALUES ('team1', '["["""userId1", "tigur01", "ADC""]"", "["""userId2", "SorakaFlockaFame", "SUPP""]"]', '2016-01-10 09:00', '2016-01-10 09:00', 1);
